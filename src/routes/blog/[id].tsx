import { Suspense } from "solid-js";
import { A, RouteDataArgs, useParams, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { Blogs, knexInstance } from "~/scripts/database";

export function routeData({ params }: RouteDataArgs) {
	return createServerData$(
		([internalID]) =>
			knexInstance<Blogs>("blogs")
				.select("*")
				.where({ id: parseInt(internalID) })
				.orderBy("date"),
		{ key: () => [params.id] } // read the reactive value in the key function
	);
}

export default function Blog() {
	const params = useParams();
	const blogID = parseInt(params.id);

	const blog = useRouteData<typeof routeData>();

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
					<h1 class="is-size-2">{blog()?.at(0)?.name}</h1>
					<div class="content" innerHTML={blog()?.at(0)?.content} />
				</div>
			</Suspense>
			<br />
			<div class="card-header-title has-background-primary-light level-left">
				Komentāri
			</div>
			<div class="card-content">TODO</div>
		</div>
	);
}
