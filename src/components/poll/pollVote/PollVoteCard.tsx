import PollVoteSingleChoice from "@/components/poll/pollVote/PollVoteSingleChoice";
import PollVoteMultipleChoice from "@/components/poll/pollVote/PollVoteMultipleChoice";
import PollVoteSlider from "@/components/poll/pollVote/PollVoteSlider";
import { type PollReadDTO } from "@shared/schemas/polls.schema";

export type PollVoteProps = {
  poll: PollReadDTO;
  roomId?: number;
  /** omitted when the poll offers no result preview, PollCard owns the switch */
  onShowResults?: () => void;
};

export default function PollVoteCard({
  poll,
  roomId,
  onShowResults,
}: PollVoteProps) {
  switch (poll.type) {
    case "single_choice":
      return (
        <PollVoteSingleChoice
          poll={poll}
          roomId={roomId}
          onShowResults={onShowResults}
        />
      );

    case "multiple_choice":
      return (
        <PollVoteMultipleChoice
          poll={poll}
          roomId={roomId}
          onShowResults={onShowResults}
        />
      );

    case "slider":
      return (
        <PollVoteSlider
          poll={poll}
          roomId={roomId}
          onShowResults={onShowResults}
        />
      );

    default:
      return null;
  }
}
