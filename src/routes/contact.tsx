import { A, redirect } from "solid-start";
import { createServerAction$ } from "solid-start/server/data.js";
import { Contact as ContactType, knexInstance } from "~/scripts/database.js";
import Card from "../components/Card.js";
import "../styles/Contact.css"

export default function Contact() {

  const [_, {Form}] = createServerAction$(async (formData: FormData) => {
    await knexInstance<ContactType>('contacts').insert({
      name: formData.get("name")?.toString() ?? "???",
      surname: formData.get("surname")?.toString() ?? "???",
      email: formData.get("email")?.toString() ?? "???",
    })

    return redirect("/contact-success")
  })

  return (
    
      <Card>
        <h1 class="title">
          Sazinies ar mani!
        </h1>
        <Form action="" method="post">
          <label for="name">
            <span class="name">Vārds</span>
            <span class="value">
              <input type="text" name="name" id="name" required />
            </span>
          </label>
          <label for="surname">
            <span class="name">Uzvārds</span>
            <span class="value">
              <input type="text" name="surname" id="surname" required />
            </span>
          </label>
          <label for="email">
            <span class="name">E-pasts</span>
            <span class="value">
              <input type="text" name="email" id="email" required />
            </span>
          </label>
          <input type="submit" value="Iesniegt" />
        </Form>
      </Card>
    
  );
}
