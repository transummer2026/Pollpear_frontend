import Layout from "@/layout/Layout";
import AuthSlider from "@/components/auth/AuthSlider";

export default function Login() {
  return (
    <Layout>
      <div className="px-4 py-10">
        <AuthSlider />
      </div>
    </Layout>
  );
}
