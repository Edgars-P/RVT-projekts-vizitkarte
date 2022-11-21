import { UnknownPageProps } from "$fresh/server.ts";
import Layout from "../components/Layout.tsx";

export default function NotFoundPage({ url }: UnknownPageProps) {
  return (
    <Layout page="404" title="404 nav atrasts!">
      <h1 style={{textAlign: "center"}}>404</h1>
    </Layout>
  );
}