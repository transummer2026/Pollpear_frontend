import PollVoteSingleChoice from "@/components/poll/pollVote/PollVoteSingleChoice";
import PollVoteMultipleChoice from "@/components/poll/pollVote/PollVoteMultipleChoice";
import PollVoteSlider from "@/components/poll/pollVote/PollVoteSlider";
import { type PollReadDTO } from "@shared/schemas/polls.schema";

type PollVoteCardProps = {
  poll: PollReadDTO;
  roomId?: number;
};

export default function PollVoteCard({ poll, roomId }: PollVoteCardProps) {
  switch (poll.type) {
    case "single_choice":
      return <PollVoteSingleChoice poll={poll} roomId={roomId} />;

    case "multiple_choice":
      return <PollVoteMultipleChoice poll={poll} roomId={roomId} />;

    case "slider":
      return <PollVoteSlider poll={poll} roomId={roomId} />;

    default:
      return null;
  }
}
