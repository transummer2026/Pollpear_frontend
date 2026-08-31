import { useEffect } from "react";
import { useSWRConfig } from "swr";
import type { FriendListItemDTO } from "@shared/schemas/friendship.schema";
import { useAuth } from "@/hooks/auth/use-auth";
import { getSocket } from "@/lib/socket";

type FriendPresenceEvent = { userId: number };

/** Rewrites one friend's online flag, leaving the rest of the list identical. */
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

/**
 * Keeps the online dots live. The server pushes a presence event per friend
 * rather than a new list, so the cached list is patched in place with
 * `revalidate: false`: refetching everyone's profile on every connect and
 * disconnect would be a lot of traffic for one boolean.
 *
 * Mounted once — the friends list is a single SWR key, and every view showing
 * a dot reads from it.
 */
export function useFriendPresence() {
  const { data: me, isAuthenticated } = useAuth();
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (!isAuthenticated || !me?.id) return;
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
  }, [me?.id, isAuthenticated, mutate]);
}
