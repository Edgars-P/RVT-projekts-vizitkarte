import { A } from "@solidjs/router";
import { Suspense } from "solid-js";
import { createRouteData, Outlet, useLocation, useNavigate, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { getLogin } from "~/scripts/login";


export function routeData() {
    return createServerData$(async (_, f) => {
        return await getLogin(f.request)
    })
}

const adminTabs = [
    { name: "Iesniegtie kontakti", url: "/auth/admin/contacts" },
    { name: "Bloga ieraksti", url: "/auth/admin/blogs" }
]

export default function UsersLayout() {

    const getLoginResource = useRouteData<typeof routeData>()

    const navigate = useNavigate()

    const url = useLocation()

    // TODO Login and validate

    return (
        <div class="is-max-desktop container">
            <Suspense>
                {(getLoginResource()?.isAdmin) ? (
                    <>
                        <div class="card-header">
                            <div class="card-header-title has-background-primary-light">
                                Administratora panelis
                            </div>
                        </div>
                        <div class="tabs">
                            <ul>
                                {adminTabs.map(tab => (
                                    <li classList={{ "is-active": url.pathname.includes(tab.url) }}><A href={tab.url}>{tab.name}</A></li>
                                ))}
                            </ul>
                        </div>
                        <Outlet />
                    </>
                ) : (
                    <div class="card box">
                        <h1>Pieeja nav atļauta!</h1>
                        <button class="button" onClick={() => navigate("/auth/login", { replace: true })}>Uz pierakstīšanās lapu</button>
                    </div>
                )}
            </Suspense>
        </div>
    );
}