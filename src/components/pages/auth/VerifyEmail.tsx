import Layout from "@/layout/Layout";
import VerifyEmailCard from "@/components/auth/VerifyEmailCard";

export default function VerifyEmail() {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div className="w-full max-w-l p-4">
          <VerifyEmailCard />
        </div>
      </div>
    </Layout>
  );
}
