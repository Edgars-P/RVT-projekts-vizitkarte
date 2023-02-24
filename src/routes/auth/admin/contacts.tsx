import { For, Suspense } from "solid-js";
import { useRouteData } from "solid-start";
import { createServerAction$, createServerData$ } from "solid-start/server";
import { Contact, knexInstance } from "~/scripts/database";

export function routeData() {
  return createServerData$(
    () => knexInstance<Contact>("contacts").select("*"),
    { key: "contacts" },
  );
}

export default function AdminView() {
  const submittedContacts = useRouteData<typeof routeData>();

  const [isDeleting, doDelete] = createServerAction$(
    async (email: string, e) => {
      await knexInstance<Contact>("contacts").where("email", email).del();
    },
    { invalidate: "contacts" },
  );

  return (
    <div class="card">
      <div class="card-header">
        <div class="card-header-title">
          Iesniegtie kontakti
        </div>
      </div>
      <div class="card-content">
        <Suspense fallback={<p>Ielādē...</p>}>
          <table class="table">
            <thead>
              <tr>
                <th>Vārds</th>
                <th>Uzvārds</th>
                <th>E-pasts</th>
                <th>Darbības</th>
              </tr>
            </thead>
            <tbody>
              <For each={submittedContacts()} fallback={<p>Iesniegumu nav!</p>}>
                {(e) => (
                  <tr>
                    <td>{e.name}</td>
                    <td>{e.surname}</td>
                    <td>
                      <a href={"mailto:" + encodeURIComponent(e.email)}>
                        {e.email}
                      </a>
                    </td>
                    <td>
                      <button
                        class="button is-small is-danger"
                        disabled={isDeleting.pending}
                        onClick={() => {
                          doDelete(e.email);
                        }}
                      >
                        Dzēst
                      </button>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </Suspense>
      </div>
    </div>
  );
}
