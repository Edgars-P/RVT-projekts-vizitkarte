import { useState } from "preact/hooks";

export default function ViewCount() {
  const [count, setCount] = useState(0);

  globalThis.addEventListener("load", async () => {
    const count = await fetch(
      "/count?path=" + encodeURIComponent(globalThis.location.pathname),
    )
      .then((x) => x.text());

    setCount(parseInt(count));
  });

  return (
    <code style={"text-align: center; display: block;"}>
      Skatījumi: {count}
    </code>
  );
}
