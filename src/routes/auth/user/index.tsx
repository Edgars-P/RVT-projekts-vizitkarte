import {For, Show, Suspense, createSignal} from "solid-js"
import {useRouteData} from "solid-start"
import {createServerAction$, createServerData$} from "solid-start/server"
import {Users, knexInstance} from "~/scripts/database"
import {getLogin, hashPassword} from "~/scripts/login"

function ChangePasword() {
	const [oldPassword, setOldPassword] = createSignal("")
	const [newPassword, setNewPassword] = createSignal("")
	const [isChanging, doChange] = createServerAction$(
		async (data: {oldPassword: string; newPassword: string}, {request}) => {
			const user = await getLogin(request)

			// Check if the old password is correct
			if (user && (await hashPassword(data.oldPassword)) === user.password) {
				const hashedPassword = await hashPassword(data.newPassword)
				await knexInstance<Users>("users")
					.where({username: user.username})
					.update({password: hashedPassword})
			} else {
				throw new Error("Nepareiza vecā parole!")
			}
		},
		{invalidate: "currentUser"}
	)

	return (
		<div class="card">
			<div class="card-header has-background-primary-light">
				<p class="card-header-title">Mainīt paroli</p>
			</div>
			<div class="card-content">
				<Show when={isChanging.error}>
					<div class="notification is-danger is-light">
						<button
							class="delete"
							onClick={() => (isChanging.error = undefined)}
						/>
						{isChanging.error.message}
					</div>
				</Show>
				<div class="field">
					<label class="label">Vecā parole</label>
					<div class="control">
						<input
							class="input"
							type="password"
							value={oldPassword()}
							onInput={e => setOldPassword(e.currentTarget.value)}
						/>
					</div>
				</div>
				<div class="field">
					<label class="label">Jaunā parole</label>
					<div class="control">
						<input
							class="input"
							type="password"
							value={newPassword()}
							onInput={e => setNewPassword(e.currentTarget.value)}
						/>
					</div>
				</div>
				<div class="field">
					<div class="control">
						<button
							class="button is-primary"
							disabled={isChanging.pending}
							onClick={() =>
								doChange({
									oldPassword: oldPassword(),
									newPassword: newPassword(),
								})
							}
						>
							Mainīt
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function currentUserDetails() {
	const currentUser = createServerData$(
		async (_, {request}) => {
			const user = await getLogin(request)
			if (user) {
				return knexInstance<Users>("users")
					.where({username: user.username})
					.first()
			}
		},
		{key: "currentUser"}
	)

	return (
		<div class="card-content">
			<Suspense fallback={<p>Ielādē...</p>}>
				<ul>
					<li>
						<b>Vārds: </b> {currentUser()?.name}
					</li>
					<li>
						<b>Lietotājvārds: </b> {currentUser()?.username}
					</li>
				</ul>
				<br />
				<br />
				<ChangePasword />
			</Suspense>
		</div>
	)
}
