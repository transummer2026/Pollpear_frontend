import { useEffect } from "react";
import { useSWRConfig } from "swr";
import type { FriendListItemDTO } from "@shared/schemas/friendship.schema";
import { useAuth } from "@/hooks/auth/use-auth";
import { getSocket } from "@/lib/socket";

type FriendPresenceEvent = { userId: number };

function patchPresence(
  friends: FriendListItemDTO[] | undefined,
  userId: number,
  isOnline: boolean,
) {
  return friends?.map((friend) =>
    friend.user.id === userId
      ? { ...friend, user: { ...friend.user, isOnline } }
      : friend,
  );
}

export function useFriendPresence() {
  const { data: me } = useAuth();
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (!me?.id) return;
    const key = `/users/${me.id}/friends`;
    const socket = getSocket();
    const onOnline = ({ userId }: FriendPresenceEvent) =>
      void mutate(
        key,
        (friends?: FriendListItemDTO[]) => patchPresence(friends, userId, true),
        { revalidate: false },
      );
    const onOffline = ({ userId }: FriendPresenceEvent) =>
      void mutate(
        key,
        (friends?: FriendListItemDTO[]) =>
          patchPresence(friends, userId, false),
        { revalidate: false },
      );
    socket.on("friend:online", onOnline);
    socket.on("friend:offline", onOffline);
    return () => {
      socket.off("friend:online", onOnline);
      socket.off("friend:offline", onOffline);
    };
  }, [me?.id, mutate]);
}
