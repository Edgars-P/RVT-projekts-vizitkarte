import {createSignal, For, Show, Suspense} from "solid-js"
import {useRouteData} from "solid-start"
import {createServerAction$, createServerData$} from "solid-start/server"
import {Blogs, knexInstance} from "~/scripts/database"
import {getLogin} from "~/scripts/login"

export function routeData() {
	return createServerData$(
		() => knexInstance<Blogs>("blogs").select("*").orderBy("date", "desc"),
		{
			key: "blogs",
		}
	)
}

function NewBlog() {
	const [name, setName] = createSignal("")
	const [content, setContent] = createSignal("")
	const [isCreating, doCreate] = createServerAction$(
		async (data: {name: string; content: string}) => {
			await knexInstance<Blogs>("blogs").insert({
				name: data.name,
				content: data.content,
				date: new Date(),
			})
		},
		{invalidate: "blogs"}
	)

	return (
		<div class="card">
			<div class="card-header">
				<p class="card-header-title">Jauns blogs</p>
			</div>
			<div class="card-content">
				<div class="field">
					<label class="label">Nosaukums</label>
					<div class="control">
						<input
							class="input"
							type="text"
							value={name()}
							onInput={e => setName(e.currentTarget.value)}
						/>
					</div>
				</div>
				<div class="field">
					<label class="label">Saturs</label>
					<div class="control">
						<textarea
							class="textarea"
							value={content()}
							onInput={e => setContent(e.currentTarget.value)}
						/>
					</div>
				</div>
				<div class="field">
					<div class="control">
						<button
							class="button is-primary"
							onClick={() =>
								doCreate({
									name: name(),
									content: content(),
								})
							}
							disabled={isCreating.pending}
						>
							Izveidot
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function BlogView() {
	const blogs = useRouteData<typeof routeData>()

	const [isDeleting, doDelete] = createServerAction$(
		async (blogId: number, {request}) => {
			// validate request to be an admin
			const login = await getLogin(request)
			if (!login || !login.isAdmin) {
				throw new Error("Unauthorized")
			}

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
				<NewBlog />
				<br />
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
												class="textarea"
												value={getNewContent()}
												onInput={e => setNewContent(e.currentTarget.value)}
											></textarea>
											<div class="content" innerHTML={getNewContent()}></div>
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
