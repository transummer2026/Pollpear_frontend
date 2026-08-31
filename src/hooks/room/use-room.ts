import {
  type RoomCreateDTO,
  type RoomPublicDTO,
  type RoomReadDTO,
  type RoomUpdateDTO,
} from "@shared/schemas/rooms.schema";
import {
  ApiError,
  fetcher,
  postJson,
  patchJson,
  deleteJson,
} from "@/lib/fetcher";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

/**
 * One room in full: its polls, its members and the invitations the viewer is a
 * side of. The key stays `null` until the route param is parsed. A private room
 * the viewer has no business in answers 403.
 */
export function useRoom(roomId?: number) {
  return useSWR<RoomReadDTO, ApiError>(
    roomId ? `/rooms/${roomId}` : null,
    fetcher,
  );
}

/** The rooms the signed-in user created or belongs to — their own space. */
export function useRooms() {
  return useSWR<RoomReadDTO[], ApiError>("/rooms", fetcher);
}

/**
 * Rooms for the feed sidebar: the ones the user owns or belongs to, plus
 * every public room — not just the ones they already joined (`/rooms`).
 */
export function useRoomsFeed() {
  return useSWR<RoomReadDTO[], ApiError>("/rooms/feed", fetcher);
}

/** Opens a room, with its creator as its first pearticipant. */
export function useRoomCreate() {
  return useSWRMutation<RoomPublicDTO, ApiError, string, RoomCreateDTO>(
    "/rooms/new",
    (resource, { arg }) => postJson<RoomPublicDTO>(resource, arg),
  );
}

/** Edits a room's own fields — title, visibility, deadline. Owner only. */
export function useRoomUpdate(roomId: number) {
  return useSWRMutation<RoomUpdateDTO, ApiError, string, RoomUpdateDTO>(
    `/rooms/${roomId}`,
    (resource, { arg }) => patchJson<RoomUpdateDTO>(resource, arg),
  );
}

/**
 * Deletes a room for good. The owner's counterpart to leaving, which is what
 * everyone else does instead (see RoomLeaveButton).
 */
export function useRoomDelete(roomId: number) {
  return useSWRMutation<void, ApiError, string>(
    `/rooms/${roomId}`,
    (resource) => deleteJson<void>(resource),
  );
}
