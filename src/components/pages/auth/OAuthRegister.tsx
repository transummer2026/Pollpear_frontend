import OAuthInformations from "@/components/auth/OAuthInformations";
import Footer from "@/components/layout/Footer";

export default function OAuthRegister() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="flex justify-center mt-7">
          <OAuthInformations />
        </div>
      </main>
      <Footer />
    </div>
  );
}
