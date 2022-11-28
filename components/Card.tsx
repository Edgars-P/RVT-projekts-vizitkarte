import { ComponentChildren } from "preact";

export default function Card(props: {children: ComponentChildren, fullPage?: boolean}) {
  return (
    <div class={`cardWrap ${props.fullPage&&"full"}`}>
      <div className="card">
        {props.children}
      </div>
    </div>
  )
}