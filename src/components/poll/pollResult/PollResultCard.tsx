import PollResultSingleMultipleChoice from "@/components/poll/pollResult/PollResultSingleMultipleChoice";
import PollResultSlider from "@/components/poll/pollResult/PollResultSlider";
import { type PollReadDTO } from "@shared/schemas/polls.schema";

export type PollResultProps = {
  poll: PollReadDTO;
  onUpdateVote: () => void;
  /** only set while previewing the results of a poll the user has not voted on */
  onBackToVote?: () => void;
};

/**
 * Picks the result layout for the poll's type. A slider has one number to show
 * where a choice poll has a bar per option, so they share nothing but their
 * frame — the switch is here so no caller has to know which is which.
 */
export default function PollResultCard({
  poll,
  onUpdateVote,
  onBackToVote,
}: PollResultProps) {
  switch (poll.type) {
    case "single_choice":
    case "multiple_choice":
      return (
        <PollResultSingleMultipleChoice
          poll={poll}
          onUpdateVote={onUpdateVote}
          onBackToVote={onBackToVote}
        />
      );

    case "slider":
      return (
        <PollResultSlider
          poll={poll}
          onUpdateVote={onUpdateVote}
          onBackToVote={onBackToVote}
        />
      );

    default:
      return null;
  }
}
