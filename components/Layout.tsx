import { ComponentChildren } from "preact";
import { Head } from "$fresh/runtime.ts";

export default function Layout(props: {title: string, page: string, children: ComponentChildren}){
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.css"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"/>
        <link rel="stylesheet" href="/styles/index.css"/>

        <link rel="stylesheet" href={`/styles/page_${props.page}.css`}/>
        <script src={`/scripts/page_${props.page}.js`} defer></script>

        <title>{props.title} - Edgara Polis</title>
      </Head>
      <body>
        <Navigation page={props.page}/>
        {props.children}
      </body>
    </>
  )
}

function Navigation(props: {page: string}) {
  return (
    <>
      <nav id="nav">
        <ul>
          <li>
            <a href="/" class={props.page=="home"?"selected":""}>Vizītkarte</a>
          </li>
          <li>
            <a href="/me" class={props.page=="me"?"selected":""}>Par mani</a>
          </li>
          <li>
            <a href="/reviews" class={props.page=="reviews"?"selected":""}>Atsauksmes</a>
          </li>
          <li>
            <a href="/contact" class={props.page=="contact"?"selected":""}>Kontakti</a>
          </li>
        </ul>
      </nav>

      <a href="#nav" class="hamburger"><i class="bi bi-list"></i></a>
      <a href="#" class="hamburgerClose"></a>
    </>
  )
}