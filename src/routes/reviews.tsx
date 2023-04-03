import {For, Show, Suspense} from "solid-js"
import {useRouteData} from "solid-start/data"
import {
	createServerAction$,
	createServerData$,
	redirect,
} from "solid-start/server"
import {knexInstance, Reviews} from "~/scripts/database"
import "../styles/Reviews.css"
import {getLogin} from "~/scripts/login"

export function routeData() {
	const submittedReviews = createServerData$(async () =>
		knexInstance<Reviews>("reviews").orderBy("created_at", "desc").select("*")
	)

	const loginDetails = createServerData$(async (_, f) => {
		return await getLogin(f.request)
	})

	return {submittedReviews, loginDetails}
}

export default function Feedback() {
	const [reviewForm, {Form}] = createServerAction$(
		async (formData: FormData, {request}) => {
			const user = await getLogin(request)

			if (!user) throw new Error("Not logged in")

			await knexInstance<Reviews>("reviews").insert({
				name: user.name,
				stars: parseInt(formData.get("stars")?.toString() ?? "5"),
				review: formData.get("review") as string,
			})

			return redirect("/reviews")
		}
	)

	const {submittedReviews, loginDetails} = useRouteData<typeof routeData>()

	return (
		<div class="is-max-desktop container">
			<div class="card">
				<div class="card-header">
					<div class="card-header-title has-background-primary-light">
						Rakstīt atsauksmi
					</div>
				</div>
				<Show
					when={loginDetails()?.username}
					fallback={
						<div class="card-content">
							<div class="notification">
								<p>Lūdzu ienākt vai reģistrēties lai rakstītu atsauksmi!</p>
							</div>
						</div>
					}
				>
					<div class="card-content">
						<Show when={reviewForm.error}>
							<div class="notification is-danger">
								{reviewForm.error?.message}
							</div>
						</Show>
						<Form>
							<div class="field">
								<label class="label">Zvaigznes</label>
								<div class="select">
									<select name="stars" id="stars">
										{Array(5)
											.fill("")
											.map((_, i) => (
												<option value={5 - i}>{5 - i}</option>
											))}
									</select>
								</div>
							</div>
							<div class="field">
								<label class="label">Saturs</label>
								<textarea class="textarea" name="review" id="review"></textarea>
							</div>
							<div class="field is-grouped is-grouped-centered">
								<p class="control">
									<button
										class="button is-primary"
										disabled={reviewForm.pending}
									>
										Iesniegt
									</button>
								</p>
							</div>
						</Form>
					</div>
				</Show>
				<div class="card-header">
					<div class="card-header-title has-background-primary-light">
						Citu atsakuksmes
					</div>
				</div>
				<div class="card-content">
					<Suspense fallback={<div>Ielādē...</div>}>
						<For
							each={submittedReviews?.call(null)}
							fallback={
								<div class="notification">
									<b>Nav atsauksmes {":("}</b> <br />
									Esi pirmais!
								</div>
							}
						>
							{review => (
								<div class="content">
									<div class="reviewHeader">
										<img
											src={
												"https://api.dicebear.com/5.x/bottts/svg?seed=" +
												encodeURIComponent(review.name)
											}
											alt={review.name}
											width={30}
											height={30}
										/>
										<span class="name">{review.name}</span>
										<span class="rating">
											{Array(5)
												.fill(0)
												.map((_, i) => (
													<i
														class={
															"bi " +
															(i + 1 <= review.stars
																? "bi-star-fill"
																: "bi-star")
														}
													></i>
												))}
										</span>
									</div>
									<p>{review.review}</p>
								</div>
							)}
						</For>
					</Suspense>
				</div>
			</div>
		</div>
	)
}
