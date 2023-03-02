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

   

  );
}
