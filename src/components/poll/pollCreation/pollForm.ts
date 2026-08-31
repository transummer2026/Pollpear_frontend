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

// Free field poll type on hold: the team decided not to implement it for now
// (no consensus on how "options" should map to a free-text answer), and the
// shared PollCreateSchema has no "free_field" branch. Commented out
// rather than deleted so it's easy to pick back up.
// export type FreeFormValues = Extract<
//   PollCreationInput,
//   { type: "free_field" }
// > & { endsAt: Date };

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

// Free field poll type on hold
// /**
//  * A free field poll carries no option at all: the question is the title and
//  * each voter writes their own answer.
//  */
// export const freeFormDefaultValues: DefaultValues<FreeFormValues> = {
//   title: "",
//   description: "",
//   type: "free_field",
//   endsAt: daysFromNow(INITIAL_DAYS),
//   allowChangeVote: true,
//   isAnonymous: false,
//   options: [],
//   hashtags: [],
// };
