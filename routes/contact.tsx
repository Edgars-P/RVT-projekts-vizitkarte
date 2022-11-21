import { Head } from "$fresh/runtime.ts";
import Layout from "../components/Layout.tsx";

export default function Contact() {
  return (
    <Layout title="Sazinies ar mani!" page="contact">
      <div class="card sized">
        <h1 class="title">
          Sazinies ar mani!
        </h1>
        <form action="" method="get">
          <label for="name">
            <span class="name">Vārds</span>
            <span class="value">
              <input type="text" name="name" id="name" />
            </span>
          </label>
          <label for="surname">
            <span class="name">Uzvārds</span>
            <span class="value">
              <input type="text" name="surname" id="surname" />
            </span>
          </label>
          <label for="email">
            <span class="name">E-pasts</span>
            <span class="value">
              <input type="text" name="email" id="email" />
            </span>
          </label>
          <input type="submit" value="Iesniegt" />
        </form>
      </div>
    </Layout>
  );
}
