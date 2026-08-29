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
