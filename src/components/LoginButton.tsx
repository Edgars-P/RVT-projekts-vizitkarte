import {Suspense} from "solid-js"
import {A, useLocation, useRouteData} from "solid-start"
import {
	createServerAction$,
	createServerData$,
	redirect,
} from "solid-start/server"
import {knexInstance, Reviews} from "~/scripts/database"

export default function LoginButton() {
	return (
		<A
			href="/auth/login"
			onClick={e => {
				e.preventDefault()
				localStorage.setItem("returnHref", location.href)
				location.pathname = "/auth/login"
			}}
			class="button"
		>
			Ienākt
		</A>
	)
}
