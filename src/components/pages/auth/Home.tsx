import HomePage from "@/components/home/HomePage";
import Layout from "@/layout/Layout";

//TODO: handle the redirection if guest or user
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Layout>
        <main className="flex-1">
          <div className="flex justify-center">
            <HomePage />
          </div>
        </main>
      </Layout>
    </div>
  );
}
