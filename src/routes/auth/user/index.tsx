import {For, Suspense} from "solid-js"
import {useRouteData} from "solid-start"
import {createServerAction$, createServerData$} from "solid-start/server"
import {Users, knexInstance} from "~/scripts/database"
import { getLogin, hashPassword } from "~/scripts/login"


export default function currentUserDetails() {

	const currentUser = createServerData$(async (_, {request}) => {
		const user = await getLogin(request)
		if (user) {
			return knexInstance<Users>("users").where({username: user.username}).first()
		}
	}, {key: "currentUser"})

	const [isChangingPassword, {Form: ChangePasswordForm}] = createServerAction$(
		async (form: FormData, {request}) => {
			const user = await getLogin(request)
			if (user) {
				const password = form.get("password") as string
				const password2 = form.get("password2") as string
				if (password === password2) {
					await knexInstance<Users>("users")
						.where({username: user.username})
						.update({password: await hashPassword(password)})
				}
			} else {
				throw new Error("Not logged in")
			}
		},
		{invalidate: "currentUser"}
	)

	return (
		<div class="card-content">
			<Suspense fallback={<p>Ielādē...</p>}> 
				<ul>
					<li><b>Vārds: </b> {currentUser()?.name}</li>
					<li><b>Lietotājvārds: </b> {currentUser()?.username}</li>
				</ul>
			</Suspense>
			<hr />
			<ChangePasswordForm>
				<div class="field">
					<label class="label">Jaunā parole</label>
					<div class="control">
						<input class="input" type="password" name="password" />
					</div>
				</div>
				<div class="field">
					<label class="label">Atkārtot jauno paroli</label>
					<div class="control">
						<input class="input" type="password" name="password2" />
					</div>
				</div>
				<div class="field">
					<div class="control">
						<button class="button is-link" disabled={isChangingPassword.pending}>Mainīt paroli</button>
					</div>
				</div>
			</ChangePasswordForm>
		</div>
	)

}
