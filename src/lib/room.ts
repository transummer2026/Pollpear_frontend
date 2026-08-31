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

/**
 * Mirrors the backend "invite" rule (casl/permissions/room.ts): a public room
 * lets any pearticipant bring someone in, a private one stays the owner's
 * alone, and a closed room takes nobody. `isPearticipant` has to be handed in
 * because the room payload leaves the viewer out of `roomMembers` — callers
 * read it off the viewer's own accepted invitation.
 */
export function canInviteToRoom(
  room: RoomReadDTO,
  userId: number | undefined,
  isPearticipant: boolean,
): boolean {
  if (isRoomClosed(room)) return false;
  if (isRoomOwnedBy(room, userId)) return true;

  return room.visibility === "public" && isPearticipant;
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
