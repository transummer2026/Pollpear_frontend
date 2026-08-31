import HomePage from "@/components/home/HomePage";
import Layout from "@/layout/Layout";

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
