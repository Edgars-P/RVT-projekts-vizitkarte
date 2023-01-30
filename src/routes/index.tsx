import { createSignal } from "solid-js";
import "../styles/Home.css"

export default function Home() {

  const [flipstate, setFlipState] = createSignal<"s1"|"s2">("s1")
  const [isFlip, setIsFlip] = createSignal(false)

  function flipCard() {
    setIsFlip(true)
    setTimeout(()=> {
      setFlipState(()=>flipstate()=="s1"?"s2":"s1")
      setIsFlip(()=>false)
    }, 500)
  }

  return (

    <div class="cardWrap">
      <div class="card sized" classList={{ side1: flipstate() == "s1", side2: flipstate() == "s2", flip: isFlip() }}>
        <i class="bi bi-arrow-repeat flipbtn" onclick={flipCard}></i>

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
    </div>

  );
}
