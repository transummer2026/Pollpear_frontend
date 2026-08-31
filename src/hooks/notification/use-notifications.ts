import useSWR from "swr";
import { useSWRConfig } from "swr";
import type { NotificationDTO } from "@shared/schemas/notification.schema";
import { ApiError, fetcher, patchJson, deleteJson } from "@/lib/fetcher";
import { useAuth } from "@/hooks/auth/use-auth";

const KEY = "/me/notifications";

/**
 * The notification inbox and the two actions the dropdown offers. The list is
 * only fetched for a signed-in user, and both actions patch the cache instead
 * of refetching: the backend has already answered, and a list that flickers
 * back to its old state before settling looks broken.
 *
 * Live arrivals are handled elsewhere, by useNotificationFeed on the same key.
 */
export function useNotifications() {
  const { isAuthenticated } = useAuth();
  const { mutate } = useSWRConfig();

  const { data } = useSWR<NotificationDTO[], ApiError>(
    isAuthenticated ? KEY : null,
    fetcher,
  );

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

  async function dismiss(id: number) {
    await deleteJson(`${KEY}/${id}`);
    await mutate(
      KEY,
      (current?: NotificationDTO[]) => current?.filter((n) => n.id !== id),
      { revalidate: false },
    );
  }

  return { notifications, unreadCount, markAllRead, dismiss };
}
