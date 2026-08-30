import Layout from "@/layout/Layout";
import AuthSlider from "@/components/auth/AuthSlider";

//TODO: handle the redirection if guest or user
export default function Login() {
  return (
    <Layout>
      <div className="px-4 py-10">
        <AuthSlider />
      </div>
    </Layout>
  );
}
