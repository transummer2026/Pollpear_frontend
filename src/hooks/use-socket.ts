import { useEffect } from "react";
import { useAuth } from "@/hooks/auth/use-auth";
import { disconnectSocket, getSocket } from "@/lib/socket";

/**
 * Ties the shared socket to the session: connects once the user is known,
 * disconnects when they sign out. Mounted once in App — every other hook just
 * calls getSocket() and listens, without worrying about who opened it.
 */
export function useSocketConnection() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;
    getSocket().connect();
    return () => disconnectSocket();
  }, [isAuthenticated]);
}
