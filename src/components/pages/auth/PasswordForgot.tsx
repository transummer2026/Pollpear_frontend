import Layout from "@/layout/Layout";
import ResetPasswordCard from "@/components/auth/ResetPasswordCard";

//TODO: handle the redirection if guest or user
export default function PasswordForgot() {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div className="w-full max-w-l p-4">
          <ResetPasswordCard />
        </div>
      </div>
    </Layout>
  );
}
