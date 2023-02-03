import { A, redirect } from "solid-start";
import { createServerAction$ } from "solid-start/server/data.js";
import { Contact as ContactType, knexInstance } from "~/scripts/database.js";
import "../styles/Contact.css"

export default function Contact() {

  const [_, { Form }] = createServerAction$(async (formData: FormData) => {
    await knexInstance<ContactType>('contacts').insert({
      name: formData.get("name")?.toString() ?? "???",
      surname: formData.get("surname")?.toString() ?? "???",
      email: formData.get("email")?.toString() ?? "???",
    })

    return redirect("/contact-success")
  })

  return (
    <div class="is-max-desktop container">
      <div class="card">
        <div class="card-header">
          <div class="card-header-title">
          Sazinies ar mani!
          </div>
        </div>
        <div class="card-content">

          <Form action="" method="post">
            <div class="field">
              <label class="label" for="name">Vārds</label>
              <div class="control">
                <input class="input" type="text" name="name" id="name" required />
              </div>
            </div>
            <div class="field">
              <label class="label" for="surname">Uzvārds</label>
              <div class="control">
                <input class="input" type="text" name="surname" id="surname" required />
              </div>
            </div>
            <div class="field">
              <label class="label" for="email">E-pasts</label>
              <div class="control">
                <input class="input" type="text" name="email" id="email" required />
              </div>
            </div>
            <div class="field is-grouped is-grouped-centered">
              <p class="control">
                <button class="button is-primary">Iesniegt</button>
              </p>
            </div>
          </Form>
        </div>

      </div>
    </div>
  );
}
