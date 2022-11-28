import { UnknownPageProps } from "$fresh/server.ts";
import Layout from "../components/Layout.tsx";
import Card from "../components/Card.tsx";

export default function NotFoundPage({ url }: UnknownPageProps) {
  return (
    <Layout page="404" title="404 nav atrasts!">
      <Card>
        <h1 class="title">404</h1>
        <div class="content" style={{textAlign: "center"}}>
          Lapu nevar atrast!
        </div>
      </Card>
    </Layout>
  );
}