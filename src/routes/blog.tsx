import { For } from "solid-js"


const blogData = [
	{
		title: "Bloga ieraksts 1",
		data: Date.now(),
		content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
		eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
		ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
		aliquip ex ea commodo consequat. Duis aute irure dolor in
		reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
		pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
		culpa qui officia deserunt mollit anim id est laborum.`
	},
	{
		title: "Bloga ieraksts 2",
		data: Date.now(),
		content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
		eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
		ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
		aliquip ex ea commodo consequat. Duis aute irure dolor in
		reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
		pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
		culpa qui officia deserunt mollit anim id est laborum.`
	},
	{
		title: "Bloga ieraksts 3",
		data: Date.now(),
		content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
		eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
		ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
		aliquip ex ea commodo consequat. Duis aute irure dolor in
		reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
		pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
		culpa qui officia deserunt mollit anim id est laborum.`
	}
]

export default function Blog() {
	return (

		<div class="is-max-desktop container">
			<For each={blogData}>
				{(blog) => (

					<div class="card block">
						<div class="card-header">
							<div class="card-header-title has-background-primary-light">
								{blog.title}
							</div>
						</div>
						<div class="card-content">
							<p>
								{blog.content.substring(0,100)}... <a href="#">Lasīt tālāk</a>
							</p>
						</div>
					</div>
				)}
			</For>
		</div>

	);
}
