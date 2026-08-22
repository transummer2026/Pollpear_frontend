import PollResultSingleMultipleChoice from "@/components/poll/pollResult/PollResultSingleMultipleChoice";
import PollResultSlider from "@/components/poll/pollResult/PollResultSlider";
import { type PollReadDTO } from "@shared/schemas/polls.schema";

export type PollResultProps = {
  poll: PollReadDTO;
  onUpdateVote: () => void;
};

export default function PollResultCard({
  poll,
  onUpdateVote,
}: PollResultProps) {
  switch (poll.type) {
    case "single_choice":
    case "multiple_choice":
      return (
        <PollResultSingleMultipleChoice
          poll={poll}
          onUpdateVote={onUpdateVote}
        />
      );

    case "slider":
      return <PollResultSlider poll={poll} onUpdateVote={onUpdateVote} />;

    default:
      return null;
  }
}
