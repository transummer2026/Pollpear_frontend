import { useAuth } from "@/hooks/auth/use-auth";
import { useLocation, Navigate, Outlet } from "react-router";

/**
 * Gate for everything that needs a session. The current location travels along
 * in the redirect state, so GuestRoute can send the user back where they were
 * headed once they have signed in.
 *
 * The loading branch matters: `isAuthenticated` is false while `/me` is still
 * in flight, and rendering the redirect straight away would bounce a
 * signed-in user to the login page on every hard refresh.
 */
export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
