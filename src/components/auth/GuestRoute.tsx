import { useAuth } from "@/hooks/auth/use-auth";
import { useLocation, Navigate, Outlet } from "react-router";

type LocationState = { from?: { pathname?: string } } | null;

/**
 * The mirror of ProtectedRoute: pages that only make sense signed out. An
 * authenticated visitor is sent on to whatever ProtectedRoute stashed in the
 * location state, or to the feed when they came here on their own.
 */
export default function GuestRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    const from = (location.state as LocationState)?.from?.pathname;
    return <Navigate to={from ?? "/feed"} replace />;
  }

  return <Outlet />;
}
