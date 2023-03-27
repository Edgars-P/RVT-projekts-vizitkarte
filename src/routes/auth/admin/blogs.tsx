import {createSignal, For, Show, Suspense} from "solid-js"
import {useRouteData} from "solid-start"
import {createServerData$} from "solid-start/server"
import {Blogs, knexInstance} from "~/scripts/database"

export function routeData() {
	return createServerData$(() => knexInstance<Blogs>("blogs").select("*"), {
		key: "blogs",
	})
}

export default function BlogView() {
	const blogs = useRouteData<typeof routeData>()

	return (
		<Suspense fallback={<p>Ielādē...</p>}>
			<div class="card-content">
				<For each={blogs()}>
					{blog => {
						const [isEdit, setIsEdit] = createSignal(false)
						return (
							<>
								<div class="card">
									<div class="card-header">
										<p class="card-header-title">{blog.name}</p>
										<button
											class="card-header-icon"
											onClick={() => setIsEdit(true)}
										>
											<i class="bi bi-pencil-fill"></i>
										</button>
										<button
											class="card-header-icon"
											onClick={() => alert("TODO")}
										>
											<i class="bi bi-trash3-fill"></i>
										</button>
									</div>
									<div class="card-content">
										<Show
											when={isEdit()}
											fallback={<div innerHTML={blog.content} />}
										>
											<textarea
												value={blog.content}
												style={{width: "100%", height: "30rem"}}
											></textarea>
											<button class="button" onClick={() => alert("TODO")}>
												Saglabāt
											</button>
											<button class="button" onClick={() => setIsEdit(false)}>
												Atcelt
											</button>
										</Show>
									</div>
								</div>
								<br />
							</>
						)
					}}
				</For>
			</div>
		</Suspense>
	)
}
