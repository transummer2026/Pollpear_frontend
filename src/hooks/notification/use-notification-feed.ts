import { useEffect } from "react";
import { useSWRConfig } from "swr";
import type { NotificationDTO } from "@shared/schemas/notification.schema";
import { useAuth } from "@/hooks/auth/use-auth";
import { MY_ROOM_INVITATIONS_KEY } from "@/hooks/room/use-pearticipants";
import { getSocket } from "@/lib/socket";

const KEY = "/me/notifications";

/**
 * Real-time half of the inbox: pushes arrivals into the `/me/notifications`
 * cache and takes back the ones the server retracts, so the badge and the
 * dropdown move without polling. Mounted once, next to useSocketConnection.
 *
 * Each event also invalidates whatever the notification implies has changed —
 * a friendship, a room membership — since the notice is the only hint the
 * frontend gets that another user acted.
 */
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
      // A room invitation carries no roomId, so refresh the whole room space:
      // the invitee's inbox on "room_invitation", and — on either type — every
      // room view, since accepting adds the invitee to a room's members.
      if (
        notification.type === "room_invitation" ||
        notification.type === "room_invitation_accepted"
      ) {
        void mutate(MY_ROOM_INVITATIONS_KEY);
        void mutate(
          (key) => typeof key === "string" && key.startsWith("/rooms"),
        );
      }
    };
    const onRemoved = ({
      type,
      actorId,
    }: {
      type: NotificationDTO["type"];
      actorId: NotificationDTO["actorId"];
    }) => {
      void mutate(
        KEY,
        (current?: NotificationDTO[]) =>
          current?.filter((n) => !(n.type === type && n.actorId === actorId)),
        { revalidate: false },
      );
      // The invitation the notice stood for is gone too (revoked or answered
      // elsewhere) — drop it from the invitee's inbox as well.
      if (type === "room_invitation") {
        void mutate(MY_ROOM_INVITATIONS_KEY);
      }
    };
    socket.on("notification:new", onNew);
    socket.on("notification:removed", onRemoved);
    return () => {
      socket.off("notification:new", onNew);
      socket.off("notification:removed", onRemoved);
    };
  }, [isAuthenticated, meId, mutate]);
}
