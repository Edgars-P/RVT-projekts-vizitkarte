import {A} from "@solidjs/router"

export default function HomePage() {
	return (
		<div class="is-max-desktop container">
			<div class="card-header has-text-centered is-size-1">
				Edgara Poļa blogs
			</div>
			<div class="card-content">
				<p>
					Šis ir mājaslapa, kurā es rakstu par programmēšanu un citiem
					interesantiem tematiem.
				</p>
				<br />
				<p>
					Šī mājaslapa ir izveidota izmantojot{" "}
					<A href="https://solidjs.com/">Solid</A>-bāzes {" "}
					<A href="https://start.solidjs.com/">Solid Start</A> frameworku, ar{" "}
					<A href="https://www.typescriptlang.org/">TypeScript</A> valodu,{" "}
					<A href="https://knexjs.org/">Knex</A> datubāzes bibliotēku un{" "}
					<A href="https://www.sqlite.org/">SQLite</A> datubāzi.
				</p>
			</div>
		</div>
	)
}
