import { A } from "@solidjs/router";
import { createSignal, Show, Suspense } from "solid-js";
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

	const [loginaction, { Form }] = createServerAction$(
		async (formdata: FormData) => {
			const res = await logIn(
				formdata.get("user")?.toString() ?? "",
				formdata.get("pass")?.toString() ?? ""
			);

			console.log(res);

			if (res === false) {
				throw new Error("Lietotājvārds vai parole nav pareiza!");
			}

			return redirect(res.isAdmin ? "/auth/admin/" : "/auth/user/", {
				headers: {
					"Set-Cookie": `secret=${res.secret}; SameSite=Strict; HttpOnly; Path=/`,
				},
			});
		}
	);

	const [getUser, setUser] = createSignal("");
	const [getPass, setPass] = createSignal("");

	return (
		<div class="is-max-desktop container">
			<div class="card">
				<div class="card-header">
					<div class="card-header-title">Pierakstīšanās</div>
				</div>
				<div class="card-content">
					<Suspense fallback={<p>Ielādē...</p>}>
						{isLoggedInResource() ? (
							<>
								<h1>Tu esi pierakstījies!</h1>
								<button
									class="button"
									onClick={() => navigate("/admin/dash", { replace: true })}
								>
									Uz administratora logu
								</button>
							</>
						) : (
							<>
								<div class="field is-grouped is-grouped-centered">
									<p class="control level">
										DEV konti testēšanai: &nbsp;
										<button
											class="button is-small"
											onClick={() => {
												setUser("Admin");
												setPass("qwertyuiopasdf");
											}}
										>
											Admin lietotājs
										</button>
										<button
											class="button is-small"
											onClick={() => {
												setUser("Edgars");
												setPass("1234567890");
											}}
										>
											Parasts lietotājs
										</button>
									</p>
								</div>
								<Form>
									<Show when={loginaction.error}>
										<div class="notification is-danger is-light">
											Pierakstīšanās kļūda: <br />
											{loginaction.error.message}
										</div>
									</Show>
									<div class="field">
										<div class="control has-icons-left has-icons-right">
											<input
												class="input"
												type="text"
												name="user"
												placeholder="Lietotājvārds"
												value={getUser()}
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
												value={getPass()}
											/>
											<span class="icon is-small is-left">
												<i class="bi bi-key-fill"></i>
											</span>
										</div>
									</div>
									<div class="field is-grouped is-grouped-centered">
										<p class="control">
											<button
												class="button is-success"
												disabled={loginaction.pending}
											>
												Ienākt
											</button>
										</p>
									</div>
									<p class="has-text-centered">
										Jauns lietotājs? <A href="/auth/register">Reģistrēties</A>
									</p>
								</Form>
							</>
						)}
					</Suspense>
				</div>
			</div>
		</div>
	);
}
