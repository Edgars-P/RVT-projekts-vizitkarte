import Layout from "../components/Layout.tsx";
import Card from "../components/Card.tsx";

const reviews = [
  {
    name: "Jānis",
    stars: 4,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat.`
  },
  {
    name: "Kārlis",
    stars: 1,
    content: `Duis aute irure dolor in
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
    culpa qui officia deserunt mollit anim id est laborum.`
  },
  {
    name: "Artūrs",
    stars: 5,
    content: `Ut enim
    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat. Duis aute irure dolor in
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
    culpa qui officia deserunt mollit anim id est laborum.`
  },
]

export default function Feedback() {
  return (
    <Layout page="reviews" title="Atsauksmes">
      <Card>
        <h1 class="title">
          Atsauksmes
        </h1>
        <div class="content">
          TODO rakstīt savu atsauksmi
        </div>
        {reviews.map(review => (

          <div class="content">
            <div className="reviewHeader">
              <img
                src={"https://api.dicebear.com/5.x/bottts/svg?seed="+encodeURIComponent(review.name)}
                alt={review.name}
                width={30}
                height={30}
              />
              <span class="name">
                {review.name}
              </span>
              <span class="rating">
                {Array(5).fill(0).map((_, i) => (

                  <i class={"bi " + ((i+1<=review.stars)?"bi-star-fill":"bi-star")}></i>
                ))}
              </span>
            </div>
            <p>{review.content}</p>
          </div>
        ))}
      </Card>
    </Layout>
  );
}
