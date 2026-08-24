import { useEffect } from "react";
import { useSWRConfig } from "swr";
import type { NotificationDTO } from "@shared/schemas/notification.schema";
import { useAuth } from "@/hooks/auth/use-auth";
import { getSocket } from "@/lib/socket";

const KEY = "/me/notifications";

export function useNotificationFeed() {
  const { data: me, isAuthenticated } = useAuth();
  const { mutate } = useSWRConfig();
  const meId = me?.id;

  useEffect(() => {
    if (!isAuthenticated || !meId) return;
    const socket = getSocket();
    const onNew = (notification: NotificationDTO) => {
      void mutate(
        KEY,
        (current?: NotificationDTO[]) =>
          current?.some((n) => n.id === notification.id)
            ? current
            : [notification, ...(current ?? [])],
        { revalidate: false },
      );
      if (notification.type === "friend_accepted" && notification.actorId) {
        void mutate(`/users/${notification.actorId}/friendship`);
        void mutate(`/users/${meId}/friends`);
      }
    };
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
  }, [isAuthenticated, meId, mutate]);
}
