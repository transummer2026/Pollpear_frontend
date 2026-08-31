import type { DefaultValues } from "react-hook-form";
import type { z } from "zod";
import { PollCreateSchema } from "@shared/schemas/polls.schema";

type PollCreationInput = z.input<typeof PollCreateSchema>;

const MS_PER_DAY = 24 * 60 * 60 * 1000;
export const INITIAL_DAYS = 3;

export type PollFormValues = Extract<
  PollCreationInput,
  { type: "single_choice" | "multiple_choice" }
> & { endsAt: Date };

export type SliderFormValues = Extract<
  PollCreationInput,
  { type: "slider" }
> & {
  endsAt: Date;
};

export const daysFromNow = (days: number) =>
  new Date(Date.now() + days * MS_PER_DAY);
export const daysUntil = (date: Date) =>
  Math.max(1, Math.round((date.getTime() - Date.now()) / MS_PER_DAY));

export const defaultValues: DefaultValues<PollFormValues> = {
  title: "",
  description: "",
  type: "single_choice",
  visibility: "public",
  endsAt: daysFromNow(INITIAL_DAYS),
  allowChangeVote: true,
  isAnonymous: false,
  options: [
    { text: "", order: 0 },
    { text: "", order: 1 },
  ],
  hashtags: [],
};

/**
 * A slider poll has no per-option label, but the DB (and so the shared schema)
 * requires a non-empty `text`. We fill it here rather than with a hidden input:
 * react-hook-form applies its own defaultValues over the DOM `defaultValue`,
 * so a hardcoded value in the markup is silently replaced by "".
 */
export const SLIDER_OPTION_TEXT = "slider";

export const scaleDefaultValues: DefaultValues<SliderFormValues> = {
  title: "",
  description: "",
  type: "slider",
  endsAt: daysFromNow(INITIAL_DAYS),
  allowChangeVote: true,
  isAnonymous: false,
  options: [
    {
      text: SLIDER_OPTION_TEXT,
      order: 0,
      sliderLeftLabel: "",
      sliderRightLabel: "",
    },
  ],
  hashtags: [],
};
