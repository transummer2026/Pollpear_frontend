import type { DefaultValues } from "react-hook-form";
import type { PollCreationInput } from "@shared/schemas/polls.schema";

const MS_PER_DAY = 24 * 60 * 60 * 1000;
export const INITIAL_DAYS = 3;

export type PollFormValues = Extract<
  PollCreationInput,
  { type: "single_choice" | "multiple_choice" }
> & { endsAt: Date };

export const daysFromNow = (days: number) =>
  new Date(Date.now() + days * MS_PER_DAY);
export const daysUntil = (date: Date) =>
  Math.max(1, Math.round((date.getTime() - Date.now()) / MS_PER_DAY));

export const defaultValues: DefaultValues<PollFormValues> = {
  title: "",
  description: "",
  type: "single_choice",
  endsAt: daysFromNow(INITIAL_DAYS),
  allowChangeVote: true,
  isAnonymous: false,
  options: [
    { label: "", order: 0 },
    { label: "", order: 1 },
  ],
  hashtags: [],
};
