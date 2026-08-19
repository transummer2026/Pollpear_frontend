import { useEffect } from "react";
import { useNavigate } from "react-router";

import { setApiErrorHandler } from "@/lib/fetcher";

const STATUS_ROUTES: Record<number, string> = {
  // No dedicated "unauthorized" page: /auth/login is already the app's one
  // destination for "you need to be signed in" (see ProtectedRoute).
  401: "/auth/login",
  403: "/forbidden",
};

/**
 * Renders nothing: it only wires the fetcher's GET-request error handler to
 * the router once, for the lifetime of the app.
 */
export default function ApiErrorRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    setApiErrorHandler((status) => {
      void navigate(STATUS_ROUTES[status] ?? "/server-error");
    });

    return () => setApiErrorHandler(null);
  }, [navigate]);

  return null;
}
