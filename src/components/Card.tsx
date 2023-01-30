import { ParentComponent } from "solid-js"
import "./Card.css"

const Card: ParentComponent<{fullPage?: boolean}> = (props) => {
  return (
    <div class={`cardWrap ${props.fullPage&&"full"}`}>
      <div class="card">
        {props.children}
      </div>
    </div>
  )
}

export default Card