import { useEffect } from "react";
import { useSWRConfig } from "swr";
import type { NotificationDTO } from "@shared/schemas/notification.schema";
import { useAuth } from "@/hooks/auth/use-auth";
import { getSocket } from "@/lib/socket";

const KEY = "/me/notifications";

export function useNotificationFeed() {
  const { isAuthenticated } = useAuth();
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (!isAuthenticated) return;
    const socket = getSocket();
    const onNew = (notification: NotificationDTO) =>
      void mutate(
        KEY,
        (current?: NotificationDTO[]) =>
          current?.some((n) => n.id === notification.id)
            ? current
            : [notification, ...(current ?? [])],
        { revalidate: false },
      );
    socket.on("notification:new", onNew);
    return () => {
      socket.off("notification:new", onNew);
    };
  }, [isAuthenticated, mutate]);
}
