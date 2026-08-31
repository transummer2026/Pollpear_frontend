import type { BlockListItemDTO } from "@shared/schemas/block.schema";

/** A blocked account as the settings list shows one, flattened from the API row. */
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
