import { Card, CardTitle } from "@/components/ui/card";
import { type PollResultProps } from "@/components/poll/pollResult/PollResultCard";
import PollResult from "@/components/poll/pollResult/PollResult";
import PollHashtags from "@/components/poll/PollHashtags";
import { getTotalVotes, getVisibleOptions } from "@/lib/poll";
import PollCardHeader from "@/components/poll/PollCardHeader";
import PollUpdateVoteButton from "@/components/poll/pollResult/PollUpdateVoteButton";
import PollCardFooter from "@/components/poll/PollCardFooter";

/**
 * Results of a choice poll, one bar per option. Multiple-choice bars are
 * coloured differently on purpose: their percentages are shares of the voters,
 * so they add up past 100 and should not read like a single-choice split.
 */
export default function PollResultSingleMultipleChoice({
  poll,
  onUpdateVote,
  onBackToVote,
}: PollResultProps) {
  const options = getVisibleOptions(poll);
  const totalVotes = getTotalVotes(options);
  const barClassName =
    poll.type === "multiple_choice"
      ? "bg-poll-bar-track poll-bar-multi"
      : "bg-poll-bar-track poll-bar-single";

  return (
    <Card size="sm" className="mx-auto p-4 space-y-3 poll-card-sunken ring-0">
      <PollCardHeader
        poll={poll}
        onToggleResults={onBackToVote}
        showingResults
      />

      <CardTitle className="text-base font-bold">{poll.title}</CardTitle>

      {poll.description && (
        <p className="text-sm text-muted-foreground wrap-anywhere">
          {poll.description}
        </p>
      )}

      <div className="space-y-3">
        {options.map((option) => (
          <PollResult
            key={option.id}
            answer={{
              id: option.id,
              text: option.text,
              votes: option._count.voteOptions,
            }}
            totalVotes={totalVotes}
            barClassName={barClassName}
          />
        ))}
      </div>

      <PollUpdateVoteButton poll={poll} onUpdateVote={onUpdateVote} />

      <PollHashtags poll={poll} />

      <PollCardFooter poll={poll} />
    </Card>
  );
}
