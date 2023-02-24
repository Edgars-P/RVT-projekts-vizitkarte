import { Suspense } from "solid-js";
import {
  createCookie,
  createRouteData,
  useNavigate,
  useRouteData,
} from "solid-start";
import {
  createServerAction$,
  createServerData$,
  redirect,
} from "solid-start/server";
import { getLogin, logIn } from "~/scripts/login";

export function routeData() {
  return createServerData$(async (_, f) => {
    return getLogin(f.request);
  });
}

export default function LoginView() {
  const isLoggedInResource = useRouteData<typeof routeData>();

  const navigate = useNavigate();
  const getLoginResource = useRouteData<typeof routeData>();

  const [_, { Form }] = createServerAction$(async (formdata: FormData) => {
    const res = await logIn(
      formdata.get("user")?.toString() ?? "",
      formdata.get("pass")?.toString() ?? "",
    );

    if (res === false) return redirect("?err");

    return redirect(res.isAdmin ? "/auth/admin/" : "/auth/user/", {
      headers: {
        "Set-Cookie": `secret=${res.secret}; SameSite=Strict; HttpOnly; Path=/`,
      },
    });
  });

  return (
    <div class="is-max-desktop container">
      <div class="card">
        <div class="card-header">
          <div class="card-header-title">
            Administratora pierakstīšanās
          </div>
        </div>
        <div class="card-content">
          <Suspense fallback={<p>Ielādē...</p>}>
            {isLoggedInResource()
              ? (
                <>
                  <h1>Tu esi pierakstījies!</h1>
                  <button
                    class="button"
                    onClick={() => navigate("/admin/dash", { replace: true })}
                  >
                    Uz administratora logu
                  </button>
                </>
              )
              : (
                <>
                  <button>Admin lietotājs</button>
                  <button>Parasts lietotājs</button>
                  <Form>
                    <div class="field">
                      <div class="control has-icons-left has-icons-right">
                        <input
                          class="input"
                          type="text"
                          name="user"
                          placeholder="Lietotājvārds"
                        />
                        <span class="icon is-small is-left">
                          <i class="bi bi-person-badge-fill"></i>
                        </span>
                      </div>
                    </div>
                    <div class="field">
                      <div class="control has-icons-left">
                        <input
                          class="input"
                          type="password"
                          name="pass"
                          placeholder="Parole"
                        />
                        <span class="icon is-small is-left">
                          <i class="bi bi-key-fill"></i>
                        </span>
                      </div>
                    </div>
                    <div class="field is-grouped is-grouped-centered">
                      <p class="control">
                        <button class="button is-success">
                          Ienākt
                        </button>
                      </p>
                    </div>
                  </Form>
                </>
              )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
