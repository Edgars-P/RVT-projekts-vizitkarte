import { Suspense } from "solid-js";
import { createRouteData, Outlet, useNavigate, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { getLogin } from "~/scripts/login";


export function routeData() {
    return createServerData$(async (_, f) => {
        return getLogin(f.request)
    })
}

export default function UsersLayout() {

    const getLoginResource = useRouteData<typeof routeData>()

    const navigate = useNavigate()

    // TODO Login and validate

    return (
        <div class="is-max-desktop container">
            <Suspense>
                {getLoginResource() ? (
                    <Outlet />
                ) : (
                    <div class="card box">
                        <h1>Lūdzams autentificēties lai piekļūtu šim resursam!</h1>
                        <button class="button" onClick={()=>navigate("/auth/login", {replace: true})}>Uz pierakstīšanās lapu</button>
                    </div>
                )}
            </Suspense>
        </div>
    );
}