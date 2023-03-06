import { A } from "@solidjs/router";
import { For, Suspense } from "solid-js";
import { useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { Blogs, knexInstance } from "~/scripts/database";

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
		culpa qui officia deserunt mollit anim id est laborum.`,
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
		culpa qui officia deserunt mollit anim id est laborum.`,
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
		culpa qui officia deserunt mollit anim id est laborum.`,
  },
];

export function routeData() {
  return createServerData$(
    () => knexInstance<Blogs>("blogs").select("*").orderBy("date", "desc"),
    { key: "blogs" },
  );
}

export default function Blog() {
  const blogs = useRouteData<typeof routeData>();

  return (
    <div class="is-max-desktop container">
      <Suspense fallback={<p>Ielādē...</p>}>
        <For each={blogs()}>
          {(blog) => (
            <div class="card block">
              <div class="card-header">
                <div class="card-header-title has-background-primary-light level">
                  <div class="level-left">
                    {blog.name}
                  </div>
                  <div class="level-right is-size-7 has-text-weight-light">
                    {new Date(blog.date).toLocaleString()}
                  </div>
                </div>
              </div>
              <div class="card-content">
                <p
                  style={{
                    height: "2em",
                    "text-overflow": "ellipsis",
                    overflow: "hidden",
                    "white-space": "nowrap",
                  }}
                >
                  {blog.content.replace(/<[^>]+>/g, "")}
                </p>
                <A href={"/blog/" + blog.id}>Lasīt tālāk</A>
              </div>
            </div>
          )}
        </For>
      </Suspense>
    </div>
  );
}
