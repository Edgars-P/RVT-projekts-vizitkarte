import { Accessor, createRenderEffect, createSignal, Show, Signal } from "solid-js";
import { createServerAction$, redirect } from "solid-start/server";
import { logIn, register } from "~/scripts/login";

function model(element: HTMLInputElement, value: Accessor<Signal<string>>) {
  const [field, setField] = value();
  createRenderEffect(() => (element.value = field()));
  element.addEventListener("input", (e) => setField((e.target as HTMLInputElement)?.value));
}

declare module "solid-js" {
  namespace JSX {
    interface Directives { // use:model
      model: Signal<string>;
    }
  }
}

export default function Register() {
  const [registering, { Form }] = createServerAction$(
    async (formdata: FormData) => {
      const res = await register(
        {
          isAdmin: false,
          name: formdata.get("name")?.toString() ?? "",
          username: formdata.get("user")?.toString() ?? "",
          password: formdata.get("pass")?.toString() ?? "",
          secret: "",
        },
      );

      if (res === "ERROR") {
        throw new Error("Nepareizi dati vai lietotājs jau pastāv!");
      }
    },
  );

  const [password, setPassword] = createSignal("");
  const [password2, setPassword2] = createSignal("");

  const passwordsMatch =
    () => ((password() !== "") && (password() === password2()));

  return (
    <div class="is-max-desktop container">
      <div class="card">
        <div class="card-header">
          <div class="card-header-title">
            Reģistrācija
          </div>
        </div>
        <div class="card-content">
          <Form>
            <Show when={registering.error}>
              <div class="notification is-danger is-light">
                Reģistrācijas kļūda: <br />
                {registering.error.message}
              </div>
            </Show>
            <div class="field">
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="text"
                  name="name"
                  placeholder="Vārds, Uzvārds"
                />
                <span class="icon is-small is-left">
                  <i class="bi bi-person-fill"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="text"
                  name="user"
                  placeholder="Lietotājvārds"
                />
                <span class="icon is-small is-left">
                  <i class="bi bi-person-badge-fill"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <div class="control has-icons-left">
                <input
                  class="input"
                  type="password"
                  name="pass"
                  placeholder="Parole"
                  use:model={[password, setPassword]}
                />
                <span class="icon is-small is-left">
                  <i class="bi bi-key-fill"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <div class="control has-icons-left">
                <input
                  class="input"
                  type="password"
                  name="pass2"
                  placeholder="Parole (Atkārtoti)"
                  use:model={[password2, setPassword2]}
                  classList={{"is-danger": !passwordsMatch() && password()!==""}}
                />
                <span class="icon is-small is-left">
                  <i class="bi bi-key-fill"></i>
                </span>
              </div>
            </div>
            <div class="field is-grouped is-grouped-centered">
              <p class="control">
                <button
                  class="button is-success"
                  disabled={registering.pending || !passwordsMatch()}
                >
                  Reģistrēties
                </button>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
