import { createSignal } from "solid-js";
import "../styles/Home.css"

export default function Home() {

  const [flipstate, setFlipState] = createSignal<"s1" | "s2">("s1")
  const [isFlip, setIsFlip] = createSignal(false)

  function flipCard() {
    setIsFlip(true)
    setTimeout(() => {
      setFlipState(() => flipstate() == "s1" ? "s2" : "s1")
      setIsFlip(() => false)
    }, 500)
  }

  return (

    <div class="is-max-desktop container">
      <div class="card">
        <div class="card-header">
          <div class="card-header-title has-background-primary-light">
            Mana vizītkarte
          </div>
        </div>
        <div class="card-content">

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


        <div class="card-header">
          <div class="card-header-title has-background-primary-light">
            Linki
          </div>
        </div>

        <div class="card-content">


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
    </div>

  );
}
