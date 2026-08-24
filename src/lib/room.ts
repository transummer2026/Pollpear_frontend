import type { RoomReadDTO } from "@shared/schemas/rooms.schema";

export function isRoomClosed(room: RoomReadDTO): boolean {
  return (
    room.status === "closed" ||
    (!!room.endsAt && new Date(room.endsAt) < new Date())
  );
}

export function formatRoomDate(date?: Date | string | null): string {
  if (!date) return "—";

  return new Date(date).toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
