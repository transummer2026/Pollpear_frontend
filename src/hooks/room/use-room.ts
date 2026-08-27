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

export function useRoom(roomId?: number) {
  return useSWR<RoomReadDTO, ApiError>(
    roomId ? `/rooms/${roomId}` : null,
    fetcher,
  );
}

export function useRooms() {
  return useSWR<RoomReadDTO[], ApiError>("/rooms", fetcher);
}

export function useRoomCreate() {
  return useSWRMutation<RoomPublicDTO, ApiError, string, RoomCreateDTO>(
    "/rooms/new",
    (resource, { arg }) => postJson<RoomPublicDTO>(resource, arg),
  );
}

export function useRoomUpdate(roomId: number) {
  return useSWRMutation<RoomUpdateDTO, ApiError, string, RoomUpdateDTO>(
    `/rooms/${roomId}`,
    (resource, { arg }) => patchJson<RoomUpdateDTO>(resource, arg),
  );
}

export function useRoomDelete(roomId: number) {
  return useSWRMutation<void, ApiError, string>(
    `/rooms/${roomId}`,
    (resource) => deleteJson<void>(resource),
  );
}
