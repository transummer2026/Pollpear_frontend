import { fetcher, postJson, deleteJson, type ApiError } from "@/lib/fetcher";
import type {
  BlockDTO,
  BlockListItemDTO,
  BlockStatusDTO,
} from "@shared/schemas/block.schema";
import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

/**
 * Where the viewer stands with `userId`, in both directions: `blockedByMe`
 * drives the block/unblock button, `blockedMe` hides what the other side no
 * longer wants shown. Blocking is symmetric in its effects, but only the author
 * of the block can lift it — the two flags never collapse into one.
 */
export function useBlockStatus(
  userId?: number,
  options: SWRConfiguration<BlockStatusDTO, ApiError> = {},
) {
  return useSWR<BlockStatusDTO, ApiError>(
    userId ? `/users/${userId}/block` : null,
    fetcher,
    { ...options },
  );
}

/**
 * The list behind the settings panel: everyone `userId` has blocked. Only ever
 * read for oneself — the backend keeps someone else's list private.
 */
export function useBlockedUsers(
  userId?: number,
  options: SWRConfiguration<BlockListItemDTO[], ApiError> = {},
) {
  return useSWR<BlockListItemDTO[], ApiError>(
    userId ? `/users/${userId}/blocks` : null,
    fetcher,
    { ...options },
  );
}

/** Blocks a user. The block hides content both ways, immediately. */
export function useBlockUser(userId: number) {
  return useSWRMutation<BlockDTO, ApiError, string, void>(
    `/users/${userId}/block`,
    (resource) => postJson<BlockDTO>(resource),
  );
}

/**
 * Lifts a block the viewer set. It does not restore what the block undid: a
 * friendship broken by blocking has to be asked for again.
 */
export function useUnblockUser(userId: number) {
  return useSWRMutation<null, ApiError, string, void>(
    `/users/${userId}/block`,
    (resource) => deleteJson<null>(resource),
  );
}
