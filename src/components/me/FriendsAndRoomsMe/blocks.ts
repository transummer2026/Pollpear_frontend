import type { BlockListItemDTO } from "@shared/schemas/block.schema";

export type BlockedUser = {
  id: number;
  name: string;
  avatarUrl: string;
};

export function toBlockedUser(item: BlockListItemDTO): BlockedUser {
  return {
    id: item.user.id,
    name: item.user.username,
    avatarUrl: item.user.avatarUrl,
  };
}
