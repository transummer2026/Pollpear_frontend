import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/fetcher";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { useVotePoll } from "@/hooks/poll/use-poll";
import { pollKeys } from "@/lib/revalidate";
import { type PollVoteProps } from "@/components/poll/pollVote/PollVoteCard";
import PollHashtags from "@/components/poll/PollHashtags";
import PollCardHeader from "@/components/poll/PollCardHeader";
import PollCardFooter from "@/components/poll/PollCardFooter";
import { getVisibleOptions } from "@/lib/poll";

/**
 * Single-choice ballot: picking an option is the vote, there is nothing to
 * confirm. Once it lands, every mounted poll list is revalidated through
 * `pollKeys` — the same poll can be on screen several times over — and the room
 * as well when the card is inside one, since it carries its own copy of the
 * polls.
 */
export default function PollVoteSingleChoice({
  poll,
  roomId,
  onShowResults,
}: PollVoteProps) {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useVotePoll(poll.id);

  const handleVote = async (optionId: number) => {
    try {
      await trigger({
        type: "single_choice",
        optionsVoted: [{ optionId }],
      });
      if (roomId) await mutate(`/rooms/${roomId}`);
      await mutate(pollKeys);
      toast.success("Vote recorded");
    } catch (err) {
      if (err instanceof ApiError) toast.error(err.message);
      else toast.error("An unknown error occurred");
    }
  };

  return (
    <Card
      size="sm"
      className="w-full self-start p-4 space-y-4 poll-card-raised ring-0"
    >
      <PollCardHeader poll={poll} onToggleResults={onShowResults} />

      <h2 className="text-base font-bold">{poll.title}</h2>

      {poll.description && (
        <p className="text-base text-muted-foreground wrap-anywhere">
          {poll.description}
        </p>
      )}

      <div className="space-y-2">
        {getVisibleOptions(poll).map((option) => (
          <Button
            key={option.id}
            type="button"
            variant="outline"
            className="w-full justify-between h-12 hover:bg-muted"
            disabled={isMutating}
            onClick={() => handleVote(option.id)}
          >
            <span>{option.text}</span>
          </Button>
        ))}
      </div>

      <PollHashtags poll={poll} />

      <PollCardFooter poll={poll} />
    </Card>
  );
}
