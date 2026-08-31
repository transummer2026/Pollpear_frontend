import {
  deleteJson,
  fetcher,
  patchJson,
  postJson,
  type ApiError,
} from "@/lib/fetcher";
import type {
  InvitationCreateDTO,
  InvitationReadDTO,
  InvitationStatusUpdateDTO,
} from "@shared/schemas/invitations.schema";
import type { RoomMemberDTO } from "@shared/schemas/room-member.schema";
import type { RoomReadDTO } from "@shared/schemas/rooms.schema";
import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useMe } from "@/hooks/user/use-me";

export const MY_ROOM_INVITATIONS_KEY = "/me/invitations";

/**
 * The pending room invitations addressed to the signed-in user — the room
 * counterpart of useFriendRequests. Keyed on the caller's own id only to hold
 * the request back until the session is known; the route always answers for
 * whoever is authenticated.
 */
export function useMyRoomInvitations(
  userId?: number,
  options: SWRConfiguration<InvitationReadDTO[], ApiError> = {},
) {
  return useSWR<InvitationReadDTO[], ApiError>(
    userId ? MY_ROOM_INVITATIONS_KEY : null,
    fetcher,
    { ...options },
  );
}

/**
 * The invitation binding one user to one room, null when there is none (the
 * backend answers 204). It is only returned to its inviter or its invitee —
 * the pair CASL also lets delete it — so a non-null answer means the viewer
 * may remove that pearticipant.
 */
export function useRoomInvitation(
  roomId?: number,
  userId?: number,
  options: SWRConfiguration<InvitationReadDTO | null, ApiError> = {},
) {
  return useSWR<InvitationReadDTO | null, ApiError>(
    roomId && userId ? `/rooms/${roomId}/invitations/${userId}` : null,
    fetcher,
    { ...options },
  );
}

/**
 * Whether the signed-in user is an active member of `room`. `roomMembers`
 * includes the viewer's own row, so that's the authority; being the creator
 * covers it too, and a freshly-accepted invitation bridges the moment between
 * the accept call and `/rooms/:id` revalidating.
 */
export function useIsRoomMember(
  room: Pick<RoomReadDTO, "id" | "createdById" | "roomMembers">,
): boolean {
  const { data: me } = useMe();
  const { data: invitation } = useRoomInvitation(room.id, me?.id);

  if (me?.id === undefined) return false;
  return (
    room.createdById === me.id ||
    room.roomMembers.some((member) => member.userId === me.id) ||
    invitation?.status === "accepted"
  );
}

/**
 * Invites one friend to a room, with an optional note (`InvitationCreateDTO`,
 * `message` capped at 255 by the shared schema). The body still has to be an
 * object even when empty: the route validates it with InvitationCreateSchema,
 * and a POST with no body leaves `req.body` undefined (Express 5), which the
 * zod object rejects — so callers pass at least `{}`.
 */
export function useSendPearticipantRequest(roomId: number, userId: number) {
  return useSWRMutation<
    InvitationReadDTO,
    ApiError,
    string,
    InvitationCreateDTO
  >(`/rooms/${roomId}/invitations/${userId}`, (resource, { arg }) =>
    postJson<InvitationReadDTO>(resource, arg ?? {}),
  );
}

/**
 * Answers an invitation, accept or reject. Only the invitee may call it, so
 * `userId` is always the viewer's own id — accepting is what creates their
 * membership, inside the same transaction as the status flip.
 */
export function useRespondToRoomInvitation(roomId: number, userId: number) {
  return useSWRMutation<
    InvitationReadDTO,
    ApiError,
    string,
    InvitationStatusUpdateDTO
  >(`/rooms/${roomId}/invitations/${userId}`, (resource, { arg }) =>
    patchJson<InvitationReadDTO>(resource, arg),
  );
}

/**
 * Cancels a still-pending invitation (soft-deletes the invitation row). Either
 * side may call it — the inviter revoking, or the invitee declining from the
 * sender-side list. This is *not* how an accepted member is removed: see
 * `useLeaveOrKickParticipant`.
 */
export function useCancelRoomInvitation(roomId: number, userId: number) {
  return useSWRMutation<null, ApiError, string, void>(
    `/rooms/${roomId}/invitations/${userId}`,
    (resource) => deleteJson<null>(resource),
  );
}

/**
 * Removes an *accepted* participant: `leave` when `userId` is the caller's own
 * id, `kick` otherwise. Hits the participants route, which drops the
 * `roomMember` row and revokes the accepted invitation in one go — so the
 * removal sticks and, for a private room, coming back needs a fresh
 * invitation rather than a bare re-`POST /participants`. Cancelling a
 * not-yet-answered invitation is `useCancelRoomInvitation`.
 */
export function useLeaveOrKickParticipant(roomId: number, userId: number) {
  return useSWRMutation<null, ApiError, string, void>(
    `/rooms/${roomId}/participants/${userId}`,
    (resource) => deleteJson<null>(resource),
  );
}

/**
 * Self-joins a room: the walk-in path for a public room, and the way back
 * into one you left. The backend gates it on the CASL `join` rule (public and
 * active, or a still-standing accepted invitation), reactivates a
 * soft-deleted membership rather than duplicating it, and is idempotent for
 * an existing member. No body — `addParticipant` reads none.
 */
export function useJoinRoom(roomId: number) {
  return useSWRMutation<RoomMemberDTO, ApiError, string, void>(
    `/rooms/${roomId}/participants`,
    (resource) => postJson<RoomMemberDTO>(resource),
  );
}
