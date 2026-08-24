import {
  type RoomCreateDTO,
  type RoomReadDTO,
} from "@shared/schemas/rooms.schema";
import { ApiError, fetcher, postJson } from "@/lib/fetcher";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export function useRoom(roomId?: number) {
  return useSWR<RoomReadDTO, ApiError>(
    roomId ? `/rooms/${roomId}` : null,
    fetcher,
  );
}

export function useRoomCreate() {
  return useSWRMutation<RoomCreateDTO, ApiError, string, RoomCreateDTO>(
    "/rooms/new",
    (resource, { arg }) => postJson<RoomCreateDTO>(resource, arg),
  );
}
