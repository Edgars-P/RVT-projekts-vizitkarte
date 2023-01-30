import { A, useLocation } from "solid-start";
import "./Nav.css"

export default function Navigation() {

    const location = useLocation();

    return (
      <div>
        <nav id="nav">
          <ul>
            <li>
              <A href="/" class={location.pathname == "/"?"selected":""}>Vizītkarte</A>
            </li>
            <li>
              <A href="/me" class={location.pathname.startsWith("/me")?"selected":""}>Par mani</A>
            </li>
            <li>
              <A href="/reviews" class={location.pathname.startsWith("/reviews")?"selected":""}>Atsauksmes</A>
            </li>
            <li>
              <A href="/contact" class={location.pathname.startsWith("/contact")?"selected":""}>Kontakti</A>
            </li>
          </ul>
        </nav>
  
        <a href="#nav" class="hamburger"><i class="bi bi-list"></i></a>
        <a href="#" class="hamburgerClose"></a>
      </div>
    )
  }