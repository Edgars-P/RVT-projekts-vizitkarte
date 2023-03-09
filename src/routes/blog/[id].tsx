import { createEffect, For, Show, Suspense } from "solid-js";
import { A, RouteDataArgs, useParams, useRouteData } from "solid-start";
import { createServerAction$, createServerData$ } from "solid-start/server";
import { Blogs, Comment, knexInstance } from "~/scripts/database";
import { getLogin } from "~/scripts/login";

export function routeData({ params }: RouteDataArgs) {
  const content = createServerData$(
    ([internalID]) =>
      knexInstance<Blogs>("blogs")
        .select("*")
        .where({ id: parseInt(internalID) })
        .orderBy("date"),
    { key: [params.id] }, // read the reactive value in the key function
  );

  const comments = createServerData$(
    ([internalID]) =>
      knexInstance<Comment>("comments")
        .select("*")
        .where({ article: parseInt(internalID) })
        .orderBy("date", "desc"),
    { key: [params.id, "comments"] },
  );

  const isLoggedIn = createServerData$(async (_, f) => {
    return await getLogin(f.request);
  });

  return { content, comments, isLoggedIn };
}

export default function Blog() {
  const params = useParams();
  const blogID = parseInt(params.id);

  const { content, comments, isLoggedIn } = useRouteData<typeof routeData>();

  const [commenting, { Form: CommentForm }] = createServerAction$(
    async (form: FormData, { request }) => {
      const user = await getLogin(request);
      if (!user) throw new Error("Lietotājs neeksistē!");

      await knexInstance<Comment>("comments").insert({
        article: parseInt(form.get("blog")?.toString() ?? "1"),
        author: user.username,
        content: form.get("content")?.toString() ?? "...",
        date: Date.now(),
      });
    },
  );

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
            when={isLoggedIn()}
            fallback={<p>Lūdzu ienākt vai reģistrēties lai konemtētu!</p>}
          >
            <CommentForm
              onSubmit={(e) => (e.target as HTMLFormElement).reset()}
            >
              <div class="field">
                <textarea name="content" class="textarea"></textarea>
              </div>
              <input
                type="hidden"
                name="blog"
                value={blogID}
                disabled={commenting.pending}
              />
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
          <For each={comments()} fallback={<p>Komentāru nav!</p>}>
            {(comment) => (
              <article
                class="message"
                style={{ "margin-bottom": "0.5rem" }}
              >
                <div class="message-header">
                  <p>{comment.author}</p>
                  <p class="is-size-7">
                    {new Date(comment.date).toLocaleString()}
                  </p>
                </div>
                <div class="message-body">
                  {comment.content}
                </div>
              </article>
            )}
          </For>
        </Suspense>
      </div>
    </div>
  );
}
