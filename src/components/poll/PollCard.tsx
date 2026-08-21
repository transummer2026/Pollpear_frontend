import { useState } from "react";
import PollVoteCard from "@/components/poll/pollVote/PollVoteCard";
import PollResultCard from "@/components/poll/pollResult/PollResultCard";
import PollUpdateVoteCard from "@/components/poll/pollVoteUpdate/PollUpdateVoteCard";
import { isPollClosed } from "@/lib/poll";
import type { PollReadDTO } from "@shared/schemas/polls.schema";

export default function PollCard({ poll }: { poll: PollReadDTO }) {
  const [isEditingVote, setIsEditingVote] = useState(false);

  const hasVoted = poll.hasVoted;
  const isClosed = isPollClosed(poll);

  if (isEditingVote)
    return (
      <PollUpdateVoteCard poll={poll} onDone={() => setIsEditingVote(false)} />
    );

  return hasVoted || isClosed ? (
    <PollResultCard poll={poll} onUpdateVote={() => setIsEditingVote(true)} />
  ) : (
    <PollVoteCard poll={poll} />
  );
}
