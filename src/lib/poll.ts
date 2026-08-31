import type { PollReadDTO } from "@shared/schemas/polls.schema";

type PollOption = PollReadDTO["options"][number];

/** Bounds of a slider poll's answer range, shared by the input and its labels. */
export const SCALE_MIN = 0;
export const SCALE_MAX = 100;

/** The tabs offered above every poll list, in the order they are rendered. */
export const POLL_FILTERS = ["all", "active", "closed"] as const;

export type PollFilter = (typeof POLL_FILTERS)[number];

/**
 * Uses `isPollClosed` so the filter matches the Open/Closed badge shown on the
 * cards: a poll past its `endsAt` counts as closed even if the row still says
 * "active".
 */
export function filterPolls(
  polls: PollReadDTO[],
  filter: PollFilter,
): PollReadDTO[] {
  if (filter === "all") return polls;

  return polls.filter((poll) => isPollClosed(poll) === (filter === "closed"));
}

/**
 * A poll counts as closed once the backend flipped its status or its deadline
 * passed. Both have to be checked: the status only moves when something acts on
 * the poll, so a deadline can be behind us while the row still reads "active".
 */
export function isPollClosed(poll: PollReadDTO): boolean {
  return poll.status === "closed" || new Date(poll.endsAt) < new Date();
}

/** Whether `userId` authored the poll. A signed-out viewer (no id) owns none. */
export function isPollOwnedBy(poll: PollReadDTO, userId?: number): boolean {
  if (userId === undefined) return false;

  return poll.createdById === userId;
}

/**
 * Editing is only offered while a poll is still pending: from the moment it
 * goes active its options carry votes, and reshaping them would rewrite results
 * people already cast.
 */
export function isPollEditable(poll: PollReadDTO): boolean {
  return poll.status === "pending";
}

/**
 * Options in their author-defined order, so every view lists them the same way.
 * Sorts in place — the array returned is the poll's own.
 */
export function getVisibleOptions(poll: PollReadDTO): PollOption[] {
  return poll.options.sort((a, b) => a.order - b.order);
}

/** Votes cast across all options: the denominator behind every result bar. */
export function getTotalVotes(options: PollOption[]): number {
  return options.reduce(
    (total, option) => total + option._count.voteOptions,
    0,
  );
}

/** Share of the vote, rounded. A poll nobody answered yet scores 0, not NaN. */
export function getVotePercent(votes: number, totalVotes: number): number {
  return totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
}

/**
 * The two ends of a slider poll as the author named them, falling back to the
 * raw bounds when they left them empty.
 */
export function getSliderLabels(poll: PollReadDTO): {
  leftLabel: string;
  rightLabel: string;
} {
  const option = poll.options?.[0];

  return {
    leftLabel: option?.sliderLeftLabel ?? `${SCALE_MIN}%`,
    rightLabel: option?.sliderRightLabel ?? `${SCALE_MAX}%`,
  };
}
