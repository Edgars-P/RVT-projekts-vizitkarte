import { Suspense } from "solid-js";
import { A, useLocation, useRouteData } from "solid-start";
import {
	createServerAction$,
	createServerData$,
	redirect,
} from "solid-start/server";
import { knexInstance, Reviews } from "~/scripts/database";
import { getLogin } from "~/scripts/login";

export default function Navigation() {
	const location = useLocation();

	const getLoginResource = createServerData$(async (_, f) => {
		return await getLogin(f.request);
	});

	const logOut = createServerAction$(async (_, b) => {
		return redirect("/", {
			headers: { "Set-Cookie": `secret=0; SameSite=Strict; HttpOnly; Path=/` },
		});
	});

	const navEntries = [
		{ href: "/", name: "Sākums" },
		{ href: "/me", name: "Par mani" },
		{ href: "/blog", name: "Blogs" },
		{ href: "/reviews", name: "Atsauksmes" },
		{ href: "/contact", name: "Kontakti" },
	];

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
						data-target="navbarBasicExample"
					>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</a>
				</div>
				<div class="navbar-menu">
					<div class="navbar-start">
						{navEntries.map((e) => (
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
									{getLoginResource() ? (
										<>
											<A
												href={
													getLoginResource()?.isAdmin
														? "/auth/admin"
														: "/auth/user"
												}
												class="button"
											>
												{getLoginResource()?.isAdmin ? (
													<>
														<i class="bi bi-wrench-adjustable"></i>&nbsp;
													</>
												) : (
													""
												)}
												{getLoginResource()?.username}
											</A>
											<a class="button is-danger" href={logOut[1].url}>
												<i class="bi bi-box-arrow-left"></i>
											</a>
										</>
									) : (
										<A href="/auth/login" class="button">
											Ienākt
										</A>
									)}
								</Suspense>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
}
