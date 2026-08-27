import Layout from "@/layout/Layout";

//TODO: handle the redirection if guest or user
export default function Home() {
  return (
    <Layout>
      <div className="flex justify-center">
        <h1>HomePage</h1>
      </div>
    </Layout>
  );
}
