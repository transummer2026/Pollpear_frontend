import ChangePasswordCardGuest from "@/components/auth/ChangePasswordCardGuest";
import ChangePasswordCardUser from "@/components/me/Settings/Section/ChangePasswordCardUser";
import { useAuth } from "@/hooks/auth/use-auth";
import Layout from "@/layout/Layout";

/**
 * One route, two flows: a signed-in user changes their password with the
 * current one, a visitor arriving from a reset link does it with the token in
 * the URL. That is why the route stays public — the second case has no session.
 */
export default function ChangePassword() {
  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div className="w-full max-w-l p-4">
          {isAuthenticated ? (
            <ChangePasswordCardUser />
          ) : (
            <ChangePasswordCardGuest />
          )}
        </div>
      </div>
    </Layout>
  );
}
