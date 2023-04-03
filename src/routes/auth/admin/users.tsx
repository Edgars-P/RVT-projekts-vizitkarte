import {For, Suspense} from "solid-js"
import {useRouteData} from "solid-start"
import {createServerAction$, createServerData$} from "solid-start/server"
import {Users, knexInstance} from "~/scripts/database"

export function routeData() {
	return createServerData$(
		() => knexInstance<Users>("users").select("*"),
		{key: "users"}
	)
}

export default function UsersTable() {
	const users = useRouteData<typeof routeData>()

	const [isDeleting, doDelete] = createServerAction$(
		async (username: string, e) => {
			await knexInstance<Users>("users").where({username: username}).del()
		},
		{invalidate: "users"}
	)

	return (
		<div class="card-content">
			<Suspense fallback={<p>Ielādē...</p>}>
				<table class="table" style={{width: "100%"}}>
					<thead>
						<tr>
							<th>Vārds</th>
							<th>Lietotājvārds</th>
							<th>Darbības</th>
						</tr>
					</thead>
					<tbody>
						<For each={users()} fallback={<p>Lietotāju nav!</p>}>
							{e => (
								<tr>
									<td>{e.name}</td>
									<td>{e.username}</td>
									<td>
										<button
											class="button is-small is-danger"
											disabled={isDeleting.pending}
											onClick={() => {
												doDelete(e.username)
											}}
										>
											Dzēst
										</button>
									</td>
								</tr>
							)}
						</For>
					</tbody>
				</table>
			</Suspense>
		</div>
	)
}