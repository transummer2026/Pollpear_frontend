import RegisterCard from "@/components/auth/RegisterCard";
import Layout from "@/layout/Layout";

//TODO: handle the redirection if guest or user
export default function Register() {
  return (
    <Layout>
      <div className="mx-auto w-full max-w-md mt-3">
        <RegisterCard />
      </div>
    </Layout>
  );
}
