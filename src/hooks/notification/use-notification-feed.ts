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
    const onRemoved = ({
      type,
      actorId,
    }: {
      type: NotificationDTO["type"];
      actorId: NotificationDTO["actorId"];
    }) =>
      void mutate(
        KEY,
        (current?: NotificationDTO[]) =>
          current?.filter((n) => !(n.type === type && n.actorId === actorId)),
        { revalidate: false },
      );
    socket.on("notification:new", onNew);
    socket.on("notification:removed", onRemoved);
    return () => {
      socket.off("notification:new", onNew);
      socket.off("notification:removed", onRemoved);
    };
  }, [isAuthenticated, mutate]);
}
