import {Show, Suspense} from "solid-js"
import {A, useLocation, useRouteData} from "solid-start"
import {
	createServerAction$,
	createServerData$,
	redirect,
} from "solid-start/server"
import {knexInstance, Reviews} from "~/scripts/database"
import {getLogin} from "~/scripts/login"
import LoginButton from "./LoginButton"

export default function Navigation() {
	const location = useLocation()

	const getLoginResource = createServerData$(async (_, f) => {
		const x = await getLogin(f.request)
		console.log(x)
		return x
	})

	const logOut = createServerAction$(async (_, b) => {
		return redirect("/", {
			headers: {"Set-Cookie": `secret=0; SameSite=Strict; HttpOnly; Path=/`},
		})
	})

	const navEntries = [
		{href: "/", name: "Sākums"},
		{href: "/me", name: "Par mani"},
		{href: "/blog", name: "Blogs"},
		{href: "/reviews", name: "Atsauksmes"},
		{href: "/contact", name: "Kontakti"},
	]

	return (
		<div class="container">
			<nav class="navbar">
				<div class="navbar-brand">
					<a class="navbar-item" href="/">
						<i class="bi bi-house is-size-3"></i>
					</a>

					<a
						role="button"
						class="navbar-burger"
						aria-label="menu"
						aria-expanded="false"
						data-target="navMenu"
					>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</a>
				</div>
				<div class="navbar-menu" id="navMenu">
					<div class="navbar-start">
						{navEntries.map(e => (
							<A
								href={e.href}
								class={
									"navbar-item " +
									(location.pathname == e.href ? "is-active" : "")
								}
							>
								{e.name}
							</A>
						))}
					</div>
					<div class="navbar-end">
						<div class="navbar-item">
							<div class="buttons">
								<Suspense>
									<Show when={getLoginResource()} fallback={<LoginButton />}>
										<A
											href={
												getLoginResource()?.isAdmin
													? "/auth/admin"
													: "/auth/user"
											}
											class="button"
										>
											<Show when={getLoginResource()?.isAdmin}>
												<i class="bi bi-wrench-adjustable"></i>&nbsp;
											</Show>
											{getLoginResource()?.username}
										</A>
										<a class="button is-danger" href={logOut[1].url}>
											<i class="bi bi-box-arrow-left"></i>
										</a>
									</Show>
								</Suspense>
							</div>
						</div>
					</div>
				</div>
			</nav>
			<script type="text/javascript">
				{`
					document.addEventListener('DOMContentLoaded', () => {

						// Get all "navbar-burger" elements
						const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
					
						// Add a click event on each of them
						$navbarBurgers.forEach( el => {
							el.addEventListener('click', () => {
					
								// Get the target from the "data-target" attribute
								const target = el.dataset.target;
								const $target = document.getElementById(target);
					
								// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
								el.classList.toggle('is-active');
								$target.classList.toggle('is-active');
					
							});
						});
					});
			`}
			</script>
		</div>
	)
}
