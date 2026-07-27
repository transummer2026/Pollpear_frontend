import ChangePasswordCardGuest from "@/components/auth/ChangePasswordCardGuest";
import ChangePasswordCardUser from "@/components/me/Settings/Section/ChangePasswordCardUser";
import { useAuth } from "@/hooks/auth/use-auth";
import Layout from "@/layout/Layout";

export default function ChangePassword() {
  const isLogged = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated;
  };

  const user = isLogged();
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div className="w-full max-w-l p-4">
          {user ? <ChangePasswordCardUser /> : <ChangePasswordCardGuest />}
        </div>
      </div>
    </Layout>
  );
}
