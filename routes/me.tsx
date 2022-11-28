import Layout from "../components/Layout.tsx";
import Card from "../components/Card.tsx";

export default function AboutMe() {
  return (
    <Layout page="me" title="Par mani">
      <Card>
        <h1 class="title">
          Par mani
        </h1>
        <div class="content">
          <p>
            Sveiki! <br />
            Mans vārds ir Edgars Polis
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </Card>
    </Layout>
  );
}
