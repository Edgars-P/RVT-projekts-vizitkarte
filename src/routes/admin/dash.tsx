import { Suspense } from "solid-js";
import { createRouteData, Outlet, useNavigate, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { isLoggedIn } from "~/scripts/login";


export function routeData() {
    return createServerData$(async (_, f) => {
        return isLoggedIn(f.request)
    })
}

export default function UsersLayout() {

    const isLoggedInResource = useRouteData<typeof routeData>()

    const navigate = useNavigate()

    // TODO Login and validate

    return (
        <div class="is-max-desktop container">
            <Suspense>
                {isLoggedInResource() ? (
                    <Outlet />
                ) : (
                    <div class="card box">
                        <h1>Lūdzams autentificēties lai piekļūtu šim resursam!</h1>
                        <button class="button" onClick={()=>navigate("/admin/login", {replace: true})}>Uz pierakstīšanās lapu</button>
                    </div>
                )}
            </Suspense>
        </div>
    );
}