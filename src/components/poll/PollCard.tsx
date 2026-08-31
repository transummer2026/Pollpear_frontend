import { useState } from "react";
import PollVoteCard from "@/components/poll/pollVote/PollVoteCard";
import PollResultCard from "@/components/poll/pollResult/PollResultCard";
import PollUpdateVoteCard from "@/components/poll/pollVoteUpdate/PollUpdateVoteCard";
import { isPollClosed, isPollOwnedBy } from "@/lib/poll";
import { useMe } from "@/hooks/user/use-me";
import type { PollReadDTO } from "@shared/schemas/polls.schema";

type PollCardProps = {
  poll: PollReadDTO;
  roomId?: number;
};

/**
 * Decides which face of a poll to show. A card is one of three things — a
 * ballot, a result, or a vote being changed — and which one it is depends on
 * the viewer, not on the poll alone: having voted or the deadline having passed
 * both settle it, and only the author may look at the results of a poll that is
 * still open.
 */
export default function PollCard({ poll, roomId }: PollCardProps) {
  const { data: me } = useMe();
  const [isEditingVote, setIsEditingVote] = useState(false);
  const [isPreviewingResults, setIsPreviewingResults] = useState(false);

  const hasVoted = poll.hasVoted;
  const isClosed = isPollClosed(poll);

  if (isEditingVote)
    return (
      <PollUpdateVoteCard poll={poll} onDone={() => setIsEditingVote(false)} />
    );

  if (hasVoted || isClosed)
    return (
      <PollResultCard poll={poll} onUpdateVote={() => setIsEditingVote(true)} />
    );

  /**
   * Same audience as the update/delete buttons: only the author, and only once
   * the poll is open, a pending one has no results worth showing yet.
   */
  const canPreviewResults =
    poll.status === "active" && isPollOwnedBy(poll, me?.id);

  return isPreviewingResults && canPreviewResults ? (
    <PollResultCard
      poll={poll}
      onUpdateVote={() => setIsEditingVote(true)}
      onBackToVote={() => setIsPreviewingResults(false)}
    />
  ) : (
    <PollVoteCard
      poll={poll}
      roomId={roomId}
      onShowResults={
        canPreviewResults ? () => setIsPreviewingResults(true) : undefined
      }
    />
  );
}
