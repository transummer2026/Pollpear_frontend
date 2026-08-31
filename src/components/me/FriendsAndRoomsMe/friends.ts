import type { FriendListItemDTO } from "@shared/schemas/friendship.schema";

/**
 * A friend as the panels display one, flattened out of the API's row. The /me
 * side keeps its own copy of these helpers: the two profiles show different
 * actions on the same shape, and sharing them would tie the pages together.
 */
export type Friend = {
  id: number;
  name: string;
  avatarUrl: string;
  status: "online" | "offline";
};

export function toFriend(item: FriendListItemDTO): Friend {
  return {
    id: item.user.id,
    name: item.user.username,
    avatarUrl: item.user.avatarUrl,
    status: item.user.isOnline ? "online" : "offline",
  };
}

/** Online first: a friend who can answer right now is the one worth showing. */
export function sortByStatus(friends: Friend[]): Friend[] {
  return [...friends].sort((a, b) =>
    a.status === b.status ? 0 : a.status === "online" ? -1 : 1,
  );
}

export function onlineOnly(friends: Friend[]): Friend[] {
  return friends.filter((friend) => friend.status === "online");
}

/** Presence dot colour, shared so every avatar in the app agrees on it. */
export function statusBadgeClass(status: Friend["status"]): string {
  return status === "online"
    ? "bg-green-600 dark:bg-green-800"
    : "bg-gray-400 dark:bg-gray-600";
}
