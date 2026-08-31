import type { DefaultValues } from "react-hook-form";
import type { z } from "zod";
import { RoomCreateSchema } from "@shared/schemas/rooms.schema";

export type RoomCreationInput = Omit<
  z.input<typeof RoomCreateSchema>,
  "endsAt"
> & {
  endsAt: Date | null;
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;
export const INITIAL_DAYS = 3;

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
