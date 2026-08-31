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

/**
 * Someone's accepted friends. Reading another user's list leaves the viewer out
 * of it — the backend never lists you among your own friend's pals — so a
 * caller counting mutual ties has to add itself back (see useUserScores).
 */
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

/** The pending requests waiting for `userId` to answer, their inbox side. */
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

/**
 * The friendship row binding the viewer to `userId`, whatever state it is in
 * (pending, accepted, rejected), or `null` when the two have no history — the
 * backend answers 204. This is what tells a profile whether to offer "Add",
 * "Accept" or "Remove".
 */
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

/**
 * Asks `userId` to be friends. Also the way back after an unfriend or a
 * rejection: the row is unique per pair and gets revived rather than duplicated.
 */
export function useSendFriendRequest(userId: number) {
  return useSWRMutation<FriendshipDTO, ApiError, string, void>(
    `/users/${userId}/friendship`,
    (resource) => postJson<FriendshipDTO>(resource),
  );
}

/**
 * Answers a pending request — accepted or rejected, `pending` being excluded
 * from the payload by the shared schema. Only the addressee may call it.
 */
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

/**
 * Unfriends, or withdraws a request still pending. The row is soft-deleted
 * rather than dropped, which is why sending a new request later revives the
 * same one.
 */
export function useRemoveFriendship(userId: number) {
  return useSWRMutation<null, ApiError, string, void>(
    `/users/${userId}/friendship`,
    (resource) => deleteJson<null>(resource),
  );
}
