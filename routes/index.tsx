import { Head } from "$fresh/runtime.ts";
import Layout from "../components/Layout.tsx";

export default function Home() {
  return (
    <Layout title="Mana vizītkarte" page="home">
      <div class="card sized side1">
        <i class="bi bi-arrow-repeat flipbtn"></i>

        <div class="side side1">
          <h1 class="title">Mana vizītkarte</h1>

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

        <div class="side side2">
          <h1 class="title">
            Linki:
          </h1>

          <ul class="links">
            <li>
              Twitter
            </li>
            <li>
              LinkedIn
            </li>
            <li>
              GitHub
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
