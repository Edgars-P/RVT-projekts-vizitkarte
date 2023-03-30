import {createSignal, For, Show, Suspense} from "solid-js"
import {useRouteData} from "solid-start"
import {createServerAction$, createServerData$} from "solid-start/server"
import {Blogs, knexInstance} from "~/scripts/database"

export function routeData() {
	return createServerData$(() => knexInstance<Blogs>("blogs").select("*"), {
		key: "blogs",
	})
}

export default function BlogView() {
	const blogs = useRouteData<typeof routeData>()

	const [isDeleting, doDelete] = createServerAction$(
		async (blogId: number, {request}) => {
			await knexInstance<Blogs>("blogs").where({id: blogId}).delete()
		},
		{invalidate: "blogs"}
	)

	const [isEditing, doEdit] = createServerAction$(
		async (data: {blogId: number; newContent: string}) => {
			await knexInstance<Blogs>("blogs")
				.where({id: data.blogId})
				.update({content: data.newContent})
		},
		{invalidate: "blogs"}
	)

	return (
		<Suspense fallback={<p>Ielādē...</p>}>
			<div class="card-content">
				<For each={blogs()}>
					{blog => {
						const [isEdit, setIsEdit] = createSignal(false)
						const [getNewContent, setNewContent] = createSignal(blog.content)
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
											onClick={() =>
												confirm("Tiešām dzēst?") && doDelete(blog.id)
											}
											disabled={isDeleting.pending}
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
												onInput={e =>
													setNewContent((e.target as HTMLTextAreaElement).value)
												}
											></textarea>
											<p innerHTML={getNewContent()} />
											<button
												class="button"
												onClick={async () => {
													await doEdit({
														blogId: blog.id,
														newContent: getNewContent(),
													})
													setIsEdit(false)
												}}
												disabled={isEditing.pending}
											>
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
