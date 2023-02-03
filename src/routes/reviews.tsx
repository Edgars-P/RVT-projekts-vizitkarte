import { Suspense } from "solid-js";
import { useRouteData } from "solid-start/data";
import { createServerAction$, createServerData$, redirect } from "solid-start/server";
import { knexInstance, Reviews } from "~/scripts/database";
import "../styles/Reviews.css"

export function routeData() {
  return createServerData$(async () => knexInstance<Reviews>('reviews').orderBy("created_at", "desc").select("*"));
}

export default function Feedback() {

  const [_, { Form }] = createServerAction$(async (formData: FormData) => {
    console.log(formData);
    
    await knexInstance<Reviews>('reviews').insert({
      name: formData.get("name")?.toString() ?? "???",
      stars: parseInt(formData.get("stars")?.toString() ?? "5"),
      review: formData.get("review")?.toString() ?? "???",
    })
  
  })

  const submittedReviews = useRouteData<typeof routeData>()

  return (

    <div class="is-max-desktop container">
      <div class="card">
        <div class="card-header">
          <div class="card-header-title">
            Rakstīt atsauksmi
          </div>
        </div>
        <div class="card-content">
          <Form>
            <div class="field">
              <label class="label">Vārds</label>
              <input class="input" type="text" name="name" id="name" />
            </div>
            <div class="field">
              <label class="label">Zvaigznes</label>
              <div class="select">
                <select name="stars" id="stars">
                  {Array(5).fill("").map((_,i)=>(<option value={5-i}>{5-i}</option>))}
                </select>
              </div>
            </div>
            <div class="field">
              <label class="label">Saturs</label>
              <textarea class="textarea" name="review" id="review"></textarea>
            </div>
            <div class="field is-grouped is-grouped-centered">
              <p class="control">
                <button class="button is-primary">Iesniegt</button>
              </p>
            </div>
          </Form>
        </div>
        <div class="card-header">
          <div class="card-header-title">
            Citu atsakuksmes
          </div>
        </div>
        <div class="card-content">
        <Suspense fallback={(<div>Ielādē...</div>)}>
          
          {submittedReviews?.call(null)?.map(review => (

            <div class="content">
              <div class="reviewHeader">
                <img
                  src={"https://api.dicebear.com/5.x/bottts/svg?seed=" + encodeURIComponent(review.name)}
                  alt={review.name}
                  width={30}
                  height={30}
                />
                <span class="name">
                  {review.name}
                </span>
                <span class="rating">
                  {Array(5).fill(0).map((_, i) => (

                    <i class={"bi " + ((i + 1 <= review.stars) ? "bi-star-fill" : "bi-star")}></i>
                  ))}
                </span>
              </div>
              <p>{review.review}</p>
            </div>
          ))}
        </Suspense>
        </div>

      </div>
    </div>

  );
}
