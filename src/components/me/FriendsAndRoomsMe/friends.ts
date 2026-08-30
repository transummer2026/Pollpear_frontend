import type { FriendListItemDTO } from "@shared/schemas/friendship.schema";

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

export function sortByStatus(friends: Friend[]): Friend[] {
  return [...friends].sort((a, b) =>
    a.status === b.status ? 0 : a.status === "online" ? -1 : 1,
  );
}

export function onlineOnly(friends: Friend[]): Friend[] {
  return friends.filter((friend) => friend.status === "online");
}

export function statusBadgeClass(status: Friend["status"]): string {
  return status === "online"
    ? "bg-green-600 dark:bg-green-800"
    : "bg-gray-400 dark:bg-gray-600";
}
