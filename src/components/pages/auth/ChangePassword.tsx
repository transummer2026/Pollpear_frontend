import Layout from "@/layout/Layout";
import ChangePasswordCardGuest from "@/components/auth/ChangePasswordCardGuest";
import ChangePasswordCardUser from "@/components/auth/ChangePasswordCardUser";
import { isLogged } from "@/hooks/auth/is-logged";

//TODO: handle the redirection if guest or user
export default function ChangePassword() {
  const user = isLogged();
  return (
    <Layout>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div className="w-full max-w-l p-4">
            { user ? <ChangePasswordCardUser /> : <ChangePasswordCardGuest /> }
          </div>
        </div>
    </Layout>
  );
}