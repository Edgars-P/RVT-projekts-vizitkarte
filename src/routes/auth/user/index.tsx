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

	return (
		<div class="card-content">
			<Suspense fallback={<p>Ielādē...</p>}> 
				<ul>
					<li><b>Vārds: </b> {currentUser()?.name}</li>
					<li><b>Lietotājvārds: </b> {currentUser()?.username}</li>
				</ul>
			</Suspense>
		</div>
	)

}
