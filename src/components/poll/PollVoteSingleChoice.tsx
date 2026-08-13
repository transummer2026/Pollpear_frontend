import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock3 } from "lucide-react";
import { toast } from "sonner";
import { ApiError } from "@/lib/fetcher";
import { usePoll, useVotePoll } from "@/hooks/poll/use-poll";
import PollResultCard from "@/components/poll/PollResultCard";

type PollVoteSingleChoiceProps = {
  pollId: number;
};

export default function PollVoteSingleChoice({
  pollId,
}: PollVoteSingleChoiceProps) {
  const { data: poll, error, isLoading } = usePoll(pollId);
  const { trigger, isMutating } = useVotePoll(pollId);
  const [votedOptionId, setVotedOptionId] = useState<number | null>(null);

  if (isLoading) {
    return (
      <Card size="sm" className="mx-auto p-4 space-y-3">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </Card>
    );
  }

  if (error || !poll) {
    return (
      <Card size="sm" className="mx-auto p-4">
        <p className="text-sm text-destructive">
          {error?.message ?? "This poll could not be loaded."}
        </p>
      </Card>
    );
  }

  if (poll.type !== "single_choice") {
    return (
      <Card size="sm" className="mx-auto p-4">
        <p className="text-sm text-muted-foreground">
          This poll is a {poll.type} poll, not a single choice one.
        </p>
      </Card>
    );
  }

  const isClosed =
    poll.status !== "active" || new Date(poll.endsAt) <= new Date();
  const previousVote = poll.myVote?.optionIds[0] ?? null;
  const currentVote = votedOptionId ?? previousVote;

  // Voted or closed: nothing left to pick, so the same poll id is read again
  // through the results route.
  if (currentVote !== null || isClosed) {
    return (
      <PollResultCard
        pollId={pollId}
        title={poll.title}
        votedOptionId={currentVote}
      />
    );
  }

  const vote = async (optionId: number) => {
    try {
      await trigger({
        type: "single_choice",
        optionsVoted: [{ optionId }],
      });
      setVotedOptionId(optionId);
      toast.success("Vote sent");
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  };

  return (
    <Card size="sm" className="mx-auto p-4 space-y-3">
      <CardContent className="flex justify-between items-center">
        <Badge variant="default">Open</Badge>
        {poll.isAnonymous && <Badge variant="outline">Anonymous</Badge>}
      </CardContent>

      <CardHeader className="space-y-2">
        <CardTitle className="text-sm font-bold">{poll.title}</CardTitle>
        {poll.description && (
          <CardDescription>{poll.description}</CardDescription>
        )}
      </CardHeader>

      {poll.pollHashtags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {poll.pollHashtags.map(({ hashtag }) => (
            <Badge key={hashtag.id} variant="outline">
              #{hashtag.name}
            </Badge>
          ))}
        </div>
      )}

      <div className="space-y-2">
        {poll.options.map((option) => (
          <Button
            key={option.id}
            type="button"
            variant="outline"
            className="w-full justify-start"
            disabled={isMutating}
            onClick={() => vote(option.id)}
          >
            {option.text}
          </Button>
        ))}
      </div>

      <div className="border-t pt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Clock3 size={16} />
        Ends {new Date(poll.endsAt).toLocaleDateString()}
      </div>
    </Card>
  );
}
