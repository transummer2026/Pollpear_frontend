import { useAuth } from "@/hooks/auth/use-auth";
import { useLocation, Navigate, Outlet } from "react-router";

type LocationState = { from?: { pathname?: string } } | null;

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
