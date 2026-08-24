import { differenceInCalendarDays } from "date-fns";
import type { RoomReadDTO } from "@shared/schemas/rooms.schema";

const RELATIVE_DAYS_THRESHOLD = 7;

export function isRoomClosed(room: RoomReadDTO): boolean {
  return (
    room.status === "closed" ||
    (!!room.endsAt && new Date(room.endsAt) < new Date())
  );
}

export function isRoomOwnedBy(room: RoomReadDTO, userId?: number): boolean {
  if (userId === undefined) return false;

  return room.createdById === userId;
}

export function formatRoomDate(date?: Date | string | null): string {
  if (!date) return "—";

  return new Date(date).toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function isRoomDeadlineNear(date?: Date | string | null): boolean {
  if (!date) return false;

  const days = differenceInCalendarDays(new Date(date), new Date());

  return days >= 0 && days < RELATIVE_DAYS_THRESHOLD;
}

export function formatRoomDeadline(date?: Date | string | null): string {
  if (!date) return "No deadline";
  if (!isRoomDeadlineNear(date)) return formatRoomDate(date);

  const days = differenceInCalendarDays(new Date(date), new Date());

  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";

  return `In ${days} days`;
}
