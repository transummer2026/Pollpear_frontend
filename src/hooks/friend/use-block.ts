import { fetcher, postJson, deleteJson, type ApiError } from "@/lib/fetcher";
import type {
  BlockDTO,
  BlockListItemDTO,
  BlockStatusDTO,
} from "@shared/schemas/block.schema";
import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

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

export function useBlockUser(userId: number) {
  return useSWRMutation<BlockDTO, ApiError, string, void>(
    `/users/${userId}/block`,
    (resource) => postJson<BlockDTO>(resource),
  );
}

export function useUnblockUser(userId: number) {
  return useSWRMutation<null, ApiError, string, void>(
    `/users/${userId}/block`,
    (resource) => deleteJson<null>(resource),
  );
}
