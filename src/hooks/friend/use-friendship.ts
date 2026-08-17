import {
  fetcher,
  postJson,
  patchJson,
  deleteJson,
  type ApiError,
} from "@/lib/fetcher";
import type {
  FriendshipDTO,
  FriendshipStatusUpdateDTO,
  FriendListItemDTO,
} from "@shared/schemas/friendship.schema";
import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export function useFriends(
  userId?: number,
  options: SWRConfiguration<FriendListItemDTO[], ApiError> = {},
) {
  return useSWR<FriendListItemDTO[], ApiError>(
    userId ? `/users/${userId}/friends` : null,
    fetcher,
    { ...options },
  );
}

export function useFriendRequests(
  userId?: number,
  options: SWRConfiguration<FriendListItemDTO[], ApiError> = {},
) {
  return useSWR<FriendListItemDTO[], ApiError>(
    userId ? `/users/${userId}/friend-requests` : null,
    fetcher,
    { ...options },
  );
}

export function useFriendshipWithUser(
  userId?: number,
  options: SWRConfiguration<FriendshipDTO | null, ApiError> = {},
) {
  return useSWR<FriendshipDTO | null, ApiError>(
    userId ? `/users/${userId}/friendship` : null,
    fetcher,
    { ...options },
  );
}

export function useSendFriendRequest(userId: number) {
  return useSWRMutation<FriendshipDTO, ApiError, string, void>(
    `/users/${userId}/friendship`,
    (resource) => postJson<FriendshipDTO>(resource),
  );
}

export function useUpdateFriendship(userId: number) {
  return useSWRMutation<
    FriendshipDTO,
    ApiError,
    string,
    FriendshipStatusUpdateDTO
  >(`/users/${userId}/friendship`, (resource, { arg }) =>
    patchJson<FriendshipDTO>(resource, arg),
  );
}

export function useRemoveFriendship(userId: number) {
  return useSWRMutation<null, ApiError, string, void>(
    `/users/${userId}/friendship`,
    (resource) => deleteJson<null>(resource),
  );
}
