import { useEffect } from "react";
import useSWR from "swr";
import { useSWRConfig } from "swr";
import type { NotificationDTO } from "@shared/schemas/notification.schema";
import { ApiError, fetcher, patchJson } from "@/lib/fetcher";
import { useAuth } from "@/hooks/auth/use-auth";
import { getSocket } from "@/lib/socket";

const KEY = "/me/notifications";

export function useNotifications() {
  const { isAuthenticated } = useAuth();
  const { mutate } = useSWRConfig();

  const { data, error, isLoading } = useSWR<NotificationDTO[], ApiError>(
    isAuthenticated ? KEY : null,
    fetcher,
  );

  useEffect(() => {
    if (!isAuthenticated) return;
    const socket = getSocket();
    const onNew = (notification: NotificationDTO) =>
      void mutate(
        KEY,
        (current?: NotificationDTO[]) => [notification, ...(current ?? [])],
        { revalidate: false },
      );
    socket.on("notification:new", onNew);
    return () => {
      socket.off("notification:new", onNew);
    };
  }, [isAuthenticated, mutate]);

  const notifications = data ?? [];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  async function markAllRead() {
    if (unreadCount === 0) return;
    await patchJson(`${KEY}/read`);
    await mutate(
      KEY,
      (current?: NotificationDTO[]) =>
        current?.map((n) => ({ ...n, isRead: true })),
      { revalidate: false },
    );
  }

  return { notifications, unreadCount, isLoading, error, markAllRead };
}
