import { A, useLocation } from "solid-start";
import { createServerAction$, redirect } from "solid-start/server";
import { knexInstance, Reviews } from "~/scripts/database";

export default function Navigation() {

  const location = useLocation();

  const navEntries = [
    { href: "/", name: "Vizītkarte" },
    { href: "/me", name: "Par mani" },
    { href: "/reviews", name: "Atsauksmes" },
    { href: "/contact", name: "Kontakti" },
    { href: "/blog", name: "Blogs" },
  ]

  return (
    <div class="container">
      <nav class="navbar">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <i class="bi bi-house is-size-3"></i>
          </a>

          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div class="navbar-menu">
          <div class="navbar-start">
            {navEntries.map(e => (
              <A
                href={e.href}
                class={"navbar-item " + (location.pathname == e.href ? "is-active" : "")}
              >{e.name}</A>
            ))}
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <A href="/admin/dash" class="button">
                  Admin
                </A>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}