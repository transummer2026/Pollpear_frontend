import Layout from "@/layout/Layout";
import ResendVerificationCard from "@/components/auth/ResendVerificationCard";

export default function ResendVerification() {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div className="w-full max-w-l p-4">
          <ResendVerificationCard />
        </div>
      </div>
    </Layout>
  );
}
