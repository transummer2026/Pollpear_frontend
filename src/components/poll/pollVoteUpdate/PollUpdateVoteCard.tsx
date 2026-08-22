import PollUpdateVoteSingleChoice from "@/components/poll/pollVoteUpdate/PollUpdateVoteSingleChoice";
import PollUpdateVoteMultipleChoice from "@/components/poll/pollVoteUpdate/PollUpdateVoteMultipleChoice";
import PollUpdateVoteSlider from "@/components/poll/pollVoteUpdate/PollUpdateVoteSlider";
import { type PollReadDTO } from "@shared/schemas/polls.schema";

export type PollUpdateVoteProps = {
  poll: PollReadDTO;
  onDone: () => void;
};

export default function PollUpdateVoteCard({
  poll,
  onDone,
}: PollUpdateVoteProps) {
  switch (poll.type) {
    case "single_choice":
      return <PollUpdateVoteSingleChoice poll={poll} onDone={onDone} />;

    case "multiple_choice":
      return <PollUpdateVoteMultipleChoice poll={poll} onDone={onDone} />;

    case "slider":
      return <PollUpdateVoteSlider poll={poll} onDone={onDone} />;

    default:
      return null;
  }
}
