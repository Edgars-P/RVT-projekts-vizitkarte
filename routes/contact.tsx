import Layout from "../components/Layout.tsx";
import { Handlers } from "$fresh/server.ts";



export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData()
    console.log([...form]);
    return new Response("", {status:301, headers:{location: "/contact-success"}})
  }
}

export default function Contact() {
  return (
    <Layout title="Sazinies ar mani!" page="contact">
      <div class="card sized">
        <h1 class="title">
          Sazinies ar mani!
        </h1>
        <form action="" method="post">
          <label for="name">
            <span class="name">Vārds</span>
            <span class="value">
              <input type="text" name="name" id="name" required/>
            </span>
          </label>
          <label for="surname">
            <span class="name">Uzvārds</span>
            <span class="value">
              <input type="text" name="surname" id="surname" required/>
            </span>
          </label>
          <label for="email">
            <span class="name">E-pasts</span>
            <span class="value">
              <input type="text" name="email" id="email" required/>
            </span>
          </label>
          <input type="submit" value="Iesniegt" />
        </form>
      </div>
    </Layout>
  );
}
