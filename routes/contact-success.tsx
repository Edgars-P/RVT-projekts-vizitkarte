import Layout from "../components/Layout.tsx";

export default function Success() {
  return (
    <Layout title="Paldies!" page="contact">
      <div style={{width: "max-content", margin: "auto", textAlign:"center"}}>
        <h1>Informācija saņemta!</h1>
        <p><a href="/contact">Atpakaļ</a></p>
      </div>
    </Layout>
  )
}