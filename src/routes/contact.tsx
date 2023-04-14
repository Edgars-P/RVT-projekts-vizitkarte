import {A, redirect} from "solid-start"
import {createServerAction$} from "solid-start/server/data.js"
import {Contact as ContactType, knexInstance} from "~/scripts/database.js"
import "../styles/Contact.css"
import {Show} from "solid-js"

export default function Contact() {
	const [isSubmitting, {Form}] = createServerAction$(
		async (formData: FormData) => {
			await knexInstance<ContactType>("contacts").insert({
				name: formData.get("name")?.toString() ?? "???",
				surname: formData.get("surname")?.toString() ?? "???",
				email: formData.get("email")?.toString() ?? "???",
			})

			return true
		}
	)

	return (
		<>
			<div class="card-header">
				<div class="card-header-title has-background-primary-light">
					Mana vizītkarte
				</div>
			</div>
			<div class="card-content">
				<ul class="contacts">
					<li>
						<span class="heading">Vārds:</span>
						<span class="contentwrap">
							<span class="content">Edgars Polis</span>
						</span>
					</li>
					<li>
						<span class="heading">Tālrunis:</span>
						<span class="contentwrap">
							<span class="content">
								<a href="tel:+371 999 999 99">+371 999 999 99</a>
							</span>
						</span>
					</li>
					<li>
						<span class="heading">E-pasts:</span>
						<span class="contentwrap">
							<span class="content">
								<a href="mailto:edgars@example.lv">edgars@example.lv</a>
							</span>
						</span>
					</li>
				</ul>
			</div>

			<div class="card-header">
				<div class="card-header-title has-background-primary-light">Linki</div>
			</div>

			<div class="card-content">
				<ul class="links">
					<li>Twitter</li>
					<li>LinkedIn</li>
					<li>GitHub</li>
				</ul>
			</div>
			<div class="card-header">
				<div class="card-header-title has-background-primary-light">
					Sazinies ar mani!
				</div>
			</div>
			<div class="card-content">
				<Show when={isSubmitting.error}>
					<div class="notification is-danger">{isSubmitting.error.message}</div>
				</Show>
				<Show
					when={!isSubmitting.result}
					fallback={
						<div class="notification is-success">Informācija iesniegta!</div>
					}
				>
					<Form action="" method="post">
						<div class="field">
							<label class="label" for="name">
								Vārds
							</label>
							<div class="control">
								<input
									class="input"
									type="text"
									name="name"
									id="name"
									required
								/>
							</div>
						</div>
						<div class="field">
							<label class="label" for="surname">
								Uzvārds
							</label>
							<div class="control">
								<input
									class="input"
									type="text"
									name="surname"
									id="surname"
									required
								/>
							</div>
						</div>
						<div class="field">
							<label class="label" for="email">
								E-pasts
							</label>
							<div class="control">
								<input
									class="input"
									type="text"
									name="email"
									id="email"
									required
								/>
							</div>
						</div>
						<div class="field is-grouped is-grouped-centered">
							<p class="control">
								<button
									class="button is-primary"
									disabled={isSubmitting.pending}
								>
									Iesniegt
								</button>
							</p>
						</div>
					</Form>
				</Show>
			</div>
		</>
	)
}
