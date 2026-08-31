import type { DefaultValues } from "react-hook-form";
import type { z } from "zod";
import { RoomCreateSchema } from "@shared/schemas/rooms.schema";

/**
 * What the room form holds. `endsAt` is overridden to a Date or null: the
 * deadline is optional and edited as a number of days, so the form carries the
 * date it was converted into, or nothing at all.
 */
export type RoomCreationInput = Omit<
  z.input<typeof RoomCreateSchema>,
  "endsAt"
> & {
  endsAt: Date | null;
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;
export const INITIAL_DAYS = 3;

// Same day/date round trip as the poll form, kept apart because a room's
// deadline can be absent entirely, which a poll's cannot.
export const daysFromNow = (days: number) =>
  new Date(Date.now() + days * MS_PER_DAY);
export const daysUntil = (date: Date) =>
  Math.max(1, Math.round((date.getTime() - Date.now()) / MS_PER_DAY));

export const defaultValues: DefaultValues<RoomCreationInput> = {
  name: "",
  description: "",
  endsAt: null,
  visibility: "public",
};
