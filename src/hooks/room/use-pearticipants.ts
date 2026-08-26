// import {
//   fetcher,
//   postJson,
//   patchJson,
//   deleteJson,
//   type ApiError,
// } from "@/lib/fetcher";
// import type {
//   FriendshipDTO,
//   FriendshipStatusUpdateDTO,
//   FriendListItemDTO,
// } from "@shared/schemas/friendship.schema";
// import type { SWRConfiguration } from "swr";
// import useSWR from "swr";
// import useSWRMutation from "swr/mutation";

// export function useFriends(
//   userId?: number,
//   options: SWRConfiguration<FriendListItemDTO[], ApiError> = {},
// ) {
//   return useSWR<FriendListItemDTO[], ApiError>(
//     userId ? `/users/${userId}/friends` : null,
//     fetcher,
//     { ...options },
//   );
// }

// export function useFriendRequests(
//   userId?: number,
//   options: SWRConfiguration<FriendListItemDTO[], ApiError> = {},
// ) {
//   return useSWR<FriendListItemDTO[], ApiError>(
//     userId ? `/users/${userId}/friend-requests` : null,
//     fetcher,
//     { ...options },
//   );
// }

// export function usePearticipantWithUser(
//   userId?: number,
//   options: SWRConfiguration<PearticipantDTO | null, ApiError> = {},
// ) {
//   return useSWR<PearticipantDTO | null, ApiError>(
//     userId ? `/users/${userId}/friendship` : null,
//     fetcher,
//     { ...options },
//   );
// }

// export function useSendPearticipantRequest(userId: number) {
//   return useSWRMutation<PearticipantDTO, ApiError, string, void>(
//     `/users/${userId}/friendship`,
//     (resource) => postJson<PearticipantDTO>(resource),
//   );
// }

// export function useUpdateFriendship(userId: number) {
//   return useSWRMutation<
//     PearticipantDTO,
//     ApiError,
//     string,
//     PearticipantStatusUpdateDTO
//   >(`/users/${userId}/friendship`, (resource, { arg }) =>
//     patchJson<PearticipantDTO>(resource, arg),
//   );
// }

// export function useRemovePearticipant(userId: number) {
//   return useSWRMutation<null, ApiError, string, void>(
//     `/rooms/${roomId}/participant/${paticipantId}`,
//     (resource) => deleteJson<null>(resource),
//   );
// }
