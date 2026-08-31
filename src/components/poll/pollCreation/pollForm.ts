import type { DefaultValues } from "react-hook-form";
import type { z } from "zod";
import { PollCreateSchema } from "@shared/schemas/polls.schema";

type PollCreationInput = z.input<typeof PollCreateSchema>;

const MS_PER_DAY = 24 * 60 * 60 * 1000;
export const INITIAL_DAYS = 3;

/**
 * What the choice form holds while it is being filled in. Narrowed from the
 * shared create schema, which is a union over the three poll types — the form
 * only ever produces one of them — and `endsAt` is pinned to a Date: the
 * deadline is edited as a number of days and converted, never typed as a
 * string.
 */
export type PollFormValues = Extract<
  PollCreationInput,
  { type: "single_choice" | "multiple_choice" }
> & { endsAt: Date };

/** Same narrowing for the slider form, whose options have a different shape. */
export type SliderFormValues = Extract<
  PollCreationInput,
  { type: "slider" }
> & {
  endsAt: Date;
};

// The deadline is picked in days but stored as a date. Both directions are
// needed: one to build the value, one to show it back in the input.
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
