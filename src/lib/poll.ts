import type { PollReadDTO } from "@shared/schemas/polls.schema";

type PollOption = PollReadDTO["options"][number];

export const SCALE_MIN = 0;
export const SCALE_MAX = 100;

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

export function isPollClosed(poll: PollReadDTO): boolean {
  return poll.status === "closed" || new Date(poll.endsAt) < new Date();
}

export function isPollOwnedBy(poll: PollReadDTO, userId?: number): boolean {
  if (userId === undefined) return false;

  return poll.createdById === userId;
}

export function isPollEditable(poll: PollReadDTO): boolean {
  return poll.status === "pending";
}

export function getVisibleOptions(poll: PollReadDTO): PollOption[] {
  return poll.options.sort((a, b) => a.order - b.order);
}

export function getTotalVotes(options: PollOption[]): number {
  return options.reduce(
    (total, option) => total + option._count.voteOptions,
    0,
  );
}

export function getVotePercent(votes: number, totalVotes: number): number {
  return totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
}

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
