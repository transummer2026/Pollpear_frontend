import { useEffect } from "react";
import { useAuth } from "@/hooks/auth/use-auth";
import { disconnectSocket, getSocket } from "@/lib/socket";

export function useSocketConnection() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;
    getSocket().connect();
    return () => disconnectSocket();
  }, [isAuthenticated]);
}
