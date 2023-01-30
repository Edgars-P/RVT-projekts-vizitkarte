import { For, Suspense } from "solid-js";
import { useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { Contact, knexInstance } from "~/scripts/database";

export function routeData() {
  return createServerData$(() => knexInstance<Contact>('contacts').select("*"));
}

export default function Success() {
  const submittedContacts = useRouteData<typeof routeData>()

  return (

    <div style={{ width: "max-content", margin: "auto", "text-align": "center" }}>
      <h1>Informācija saņemta!</h1>
      <p><a href="/contact">Atpakaļ</a></p>

      <br />
      <br />
      <br />

      <h3>Pagaidu iesniegumu saraksts</h3>
      <table>
        <thead>
          <tr>
            <th>Vārds</th>
            <th>Uzvārds</th>
            <th>E-pasts</th>
          </tr>
        </thead>
        <tbody>
          <Suspense fallback={(<div>Ielādē...</div>)}>
            <>
              {submittedContacts()?.map(c => (
                <tr>
                  <td>{c.name}</td>
                  <td>{c.surname}</td>
                  <td>{c.email}</td>
                </tr>
              ))}
            </>
          </Suspense>
        </tbody>
      </table>
    </div>

  )
}