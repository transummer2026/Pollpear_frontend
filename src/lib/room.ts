import { differenceInCalendarDays } from "date-fns";
import type { RoomReadDTO } from "@shared/schemas/rooms.schema";

// Past a week out, an absolute date reads better than "in 23 days".
const RELATIVE_DAYS_THRESHOLD = 7;

/**
 * A room counts as closed once its status says so or its deadline passed — same
 * rule as a poll, and for the same reason: the status is only flipped when
 * something acts on the room, so the date has to be checked too. A room without
 * a deadline stays open until someone closes it.
 */
export function isRoomClosed(room: RoomReadDTO): boolean {
  return (
    room.status === "closed" ||
    (!!room.endsAt && new Date(room.endsAt) < new Date())
  );
}

/** Whether `userId` created the room. A signed-out viewer (no id) owns none. */
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

/** An absolute date for the room cards, or an em dash when there is none. */
export function formatRoomDate(date?: Date | string | null): string {
  if (!date) return "—";

  return new Date(date).toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** Whether a deadline is close enough to be worth counting down to. */
export function isRoomDeadlineNear(date?: Date | string | null): boolean {
  if (!date) return false;

  const days = differenceInCalendarDays(new Date(date), new Date());

  return days >= 0 && days < RELATIVE_DAYS_THRESHOLD;
}

/**
 * The deadline as a reader wants it: a countdown while it is near, a plain date
 * once it is far off or already behind us.
 */
export function formatRoomDeadline(date?: Date | string | null): string {
  if (!date) return "No deadline";
  if (!isRoomDeadlineNear(date)) return formatRoomDate(date);

  const days = differenceInCalendarDays(new Date(date), new Date());

  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";

  return `In ${days} days`;
}
