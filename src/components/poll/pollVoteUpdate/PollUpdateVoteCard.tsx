import PollUpdateVoteSingleChoice from "@/components/poll/pollVoteUpdate/PollUpdateVoteSingleChoice";
import PollUpdateVoteMultipleChoice from "@/components/poll/pollVoteUpdate/PollUpdateVoteMultipleChoice";
import PollUpdateVoteSlider from "@/components/poll/pollVoteUpdate/PollUpdateVoteSlider";
import { type PollReadDTO } from "@shared/schemas/polls.schema";

export type PollUpdateVoteProps = {
  poll: PollReadDTO;
  onDone: () => void;
};

/**
 * Same ballots as pollVote, wired to PATCH instead of POST, plus a way out
 * without voting. Kept apart from the vote cards because the two differ in
 * their verb and their exits, not in their markup.
 */
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
