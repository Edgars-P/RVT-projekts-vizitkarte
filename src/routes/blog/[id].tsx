import {createEffect, createSignal, For, Show, Suspense} from "solid-js"
import {A, RouteDataArgs, useParams, useRouteData} from "solid-start"
import {createServerAction$, createServerData$} from "solid-start/server"
import {Blogs, Comment, knexInstance} from "~/scripts/database"
import {getLogin} from "~/scripts/login"

export function routeData({params}: RouteDataArgs) {
	const content = createServerData$(
		([internalID]) =>
			knexInstance<Blogs>("blogs")
				.select("*")
				.where({id: parseInt(internalID)})
				.orderBy("date"),
		{key: [params.id]} // read the reactive value in the key function
	)

	const comments = createServerData$(
		([internalID]) =>
			knexInstance<Comment>("comments")
				.select("*")
				.where({article: parseInt(internalID)})
				.orderBy("date", "desc"),
		{key: [params.id, "comments"]}
	)

	const getLoginObj = createServerData$(async (_, f) => {
		return await getLogin(f.request)
	})

	return {content, comments, getLoginObj}
}

function CommentElement(props: {comment: Comment; comments: Comment[]}) {
	const {getLoginObj} = useRouteData<typeof routeData>()

	return (
		<article
			class="message"
			style={{"margin-bottom": "0.5rem", border: "0.1rem solid #00000033"}}
		>
			<div class="message-header">
				<p>{props.comment.author}</p>
				<div style={{"white-space": "nowrap"}} class="level">
					<span class="is-size-7">
						{new Date(props.comment.date).toLocaleString()}
					</span>
					<Suspense>
						<Show
							when={
								getLoginObj()?.isAdmin ||
								getLoginObj()?.username === props.comment.author
							}
						>
							&nbsp;
							<button
								onClick={() => alert("TODO")}
								class="button is-danger is-outlined is-small"
								style={{padding: "0.3rem"}}
							>
								<i class="bi bi-trash3-fill"></i>
							</button>
						</Show>
					</Suspense>
				</div>
			</div>
			<div
				class="message-body"
				style={{"padding-right": "0.5rem", "padding-bottom": "0"}}
			>
				<p>{props.comment.content}</p>
				<For each={props.comments.filter(x => x.replyto === props.comment.id)}>
					{reply => (
						<CommentElement comment={reply} comments={props.comments} />
					)}
				</For>
				<button
					class="button is-small is-text"
					onClick={() => setReplyTo(props.comment.id)}
				>
					Atbildēt
				</button>
			</div>
		</article>
	)
}

const [getReplyTo, setReplyTo] = createSignal(-1)
const [getRekey, setReKey] = createSignal(1)

export default function Blog() {
	const params = useParams()
	const blogID = parseInt(params.id)

	const {content, comments, getLoginObj} = useRouteData<typeof routeData>()

	const [commenting, {Form: CommentForm}] = createServerAction$(
		async (form: FormData, {request}) => {
			const user = await getLogin(request)
			if (!user) throw new Error("Lietotājs neeksistē!")

			console.log(form)

			const replyTo = parseInt(form.get("replyto")?.toString() ?? "-1")

			await knexInstance<Comment>("comments").insert({
				article: parseInt(form.get("blog")?.toString() ?? "1"),
				author: user.username,
				content: form.get("content")?.toString() ?? "...",
				date: Date.now(),
				replyto: replyTo == -1 ? null : replyTo,
			})
		}
	)

	return (
		<div class="is-max-desktop container">
			<Suspense fallback={<p>Ielādē...</p>}>
				<div class="card-header has-background-primary-light level-left">
					<A class="is-size-4" href="/blog">
						<i class="bi bi-chevron-double-left"></i>
					</A>
					&nbsp;
					<h1 class="is-size-4">Blogs</h1>
				</div>
				<div class="card-content">
					<h1 class="is-size-2">{content()?.at(0)?.name}</h1>
					<div class="content" innerHTML={content()?.at(0)?.content} />
				</div>
			</Suspense>
			<br />
			<div class="card-header-title has-background-primary-light level-left">
				Komentāri
			</div>
			<div class="card-content">
				<Suspense fallback={<p>Ielādē...</p>}>
					<Show
						when={getLoginObj()}
						fallback={<p>Lūdzu ienākt vai reģistrēties lai konemtētu!</p>}
					>
						<CommentForm>
							<Show when={getReplyTo() !== -1}>
								<div class="notification">
									<button class="delete" onClick={() => setReplyTo(-1)} />
									Atbild komentāram {"#" + getReplyTo()}
								</div>
							</Show>
							<div class="field">
								<textarea name="content" class="textarea"></textarea>
							</div>
							<input
								type="hidden"
								name="blog"
								value={blogID}
								disabled={commenting.pending}
							/>
							<input type="hidden" name="replyto" value={getReplyTo()} />
							<div class="field is-grouped is-grouped-centered">
								<div class="control">
									<input
										type="submit"
										value="Komentēt!"
										class="button is-primary"
										disabled={commenting.pending}
									/>
								</div>
							</div>
						</CommentForm>
					</Show>
				</Suspense>
				<hr />
				<Suspense fallback={<p>Ielādē...</p>}>
					<For
						each={comments()?.filter(x => x.replyto === null)}
						fallback={<div class="notification">Komentāru nav!</div>}
					>
						{comment => (
							<CommentElement
								comment={comment}
								comments={comments() as Comment[]}
							/>
						)}
					</For>
				</Suspense>
			</div>
		</div>
	)
}
