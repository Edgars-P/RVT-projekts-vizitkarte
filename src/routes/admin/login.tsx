import { Suspense, } from "solid-js"
import { createCookie, createRouteData, useNavigate, useRouteData } from "solid-start"
import { createServerAction$, createServerData$, redirect } from "solid-start/server"
import { isLoggedIn, logIn } from "~/scripts/login"


export function routeData() {
	return createServerData$(async (_, f) => {
		return isLoggedIn(f.request)
	})
}

export default function LoginView() {

	const isLoggedInResource = useRouteData<typeof routeData>()

	const navigate = useNavigate()

	const [_, { Form }] = createServerAction$(async (formdata: FormData) => {
		const res = await logIn(
			formdata.get("user")?.toString() ?? "", 
			formdata.get("pass")?.toString() ?? ""
		)

		if(res === false) return redirect("?err")

		return redirect("/admin/dash", {headers: {"Set-Cookie": `secret=${res}; SameSite=Strict; HttpOnly; Path=/`}})
	})

	return (
		<div class="is-max-desktop container">
			<div class="card">
				<div class="card-header">
					<div class="card-header-title">
						Administratora pierakstīšanās
					</div>
				</div>
				<div class="card-content">
					<Suspense fallback={(<p>Ielādē...</p>)}>
						{isLoggedInResource() ? (
							<>
								<h1>Tu esi pierakstījies!</h1>
								<button class="button" onClick={() => navigate("/admin/dash", { replace: true })}>
									Uz administratora logu
								</button>
							</>
						) : (
							<Form>
								<input type="text" name="user" /><br />
								<input type="password" name="pass" /><br />
								<input type="submit" value="Pierakstīties!" />
							</Form>
						)}
					</Suspense>
				</div>
			</div>
		</div>
	)
}