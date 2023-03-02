// @refresh reload
import { Resource, Suspense } from "solid-js";
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
  useLocation,
  useRouteData,
} from "solid-start";
import { createServerAction$, createServerData$ } from "solid-start/server";
import Navigation from "./components/Nav";
import "./root.css";
import { routeData } from "./root.data";

import "bulma";

export default function Root() {

  return (
    <Html lang="en">
      <Head>
        <Meta charset="utf-8" />

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css" />

        <Title>Blogs - Edgara Polis</Title>
      </Head>
      <Body>
        <Navigation />
        <br />
        <Suspense>
          <ErrorBoundary>
            <Routes>
                <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
        <br />
        <br />
      </Body>
    </Html>
  );
}
