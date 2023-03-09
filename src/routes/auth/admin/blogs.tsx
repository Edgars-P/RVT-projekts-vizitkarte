import { For, Suspense } from "solid-js";
import { useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { Blogs, knexInstance } from "~/scripts/database";

export function routeData() {
	return createServerData$(() => knexInstance<Blogs>("blogs").select("*"), {
		key: "blogs",
	});
}

export default function BlogView() {
	const blogs = useRouteData<typeof routeData>();

	return (
		<Suspense fallback={<p>Ielādē...</p>}>
			<For each={blogs()}>{(blog) => <p>{JSON.stringify(blog)}</p>}</For>
		</Suspense>
	);
}
