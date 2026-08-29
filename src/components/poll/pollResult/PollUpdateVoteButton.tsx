import { Button } from "@/components/ui/button";
import { isPollClosed } from "@/lib/poll";
import { type PollResultProps } from "@/components/poll/pollResult/PollResultCard";

/** the button only raises the intent, PollCard owns the edit mode */
export default function PollUpdateVoteButton({
  poll,
  onUpdateVote,
}: PollResultProps) {
  if (!poll.hasVoted || !poll.allowChangeVote || isPollClosed(poll))
    return null;

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={onUpdateVote}
    >
      Update your vote
    </Button>
  );
}
