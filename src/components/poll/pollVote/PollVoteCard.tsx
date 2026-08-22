import PollVoteSingleChoice from "@/components/poll/pollVote/PollVoteSingleChoice";
import PollVoteMultipleChoice from "@/components/poll/pollVote/PollVoteMultipleChoice";
import PollVoteSlider from "@/components/poll/pollVote/PollVoteSlider";
import { type PollReadDTO } from "@shared/schemas/polls.schema";

export default function PollVoteCard({ poll }: { poll: PollReadDTO }) {
  switch (poll.type) {
    case "single_choice":
      return <PollVoteSingleChoice poll={poll} />;

    case "multiple_choice":
      return <PollVoteMultipleChoice poll={poll} />;

    case "slider":
      return <PollVoteSlider poll={poll} />;

    default:
      return null;
  }
}
