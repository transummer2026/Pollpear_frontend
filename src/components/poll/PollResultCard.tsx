import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Vote } from "lucide-react";
import PollResult from "@/components/poll/PollResult";
import { usePollResults } from "@/hooks/poll/use-poll";

type PollResultCardProps = {
  pollId: number;
  title: string;
  /** option the current user voted for, highlighted in the list */
  votedOptionId?: number | null;
};

export default function PollResultCard({
  pollId,
  title,
  votedOptionId,
}: PollResultCardProps) {
  const { data: results, error, isLoading } = usePollResults(pollId);

  return (
    <Card size="sm" className="mx-auto p-4 space-y-3">
      <h2 className="text-sm font-bold">{title}</h2>

      {isLoading && (
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive">
          Results are not available right now.
        </p>
      )}

      {results && (
        <>
          <div className="space-y-3">
            {results.options.map((option) => (
              <div
                key={option.id}
                className={
                  option.id === votedOptionId
                    ? "rounded-xl ring-1 ring-foreground/20 p-2"
                    : "p-2"
                }
              >
                <PollResult
                  answer={{
                    id: option.id,
                    label: option.label,
                    votes: option.votes,
                  }}
                  totalVotes={results.totalVotes}
                />
                {option.id === votedOptionId && (
                  <Badge variant="secondary" className="mt-2">
                    Your vote
                  </Badge>
                )}
              </div>
            ))}
          </div>

          <CardContent className="border-t pt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Vote size={16} />
            {results.totalVotes} votes
          </CardContent>
        </>
      )}
    </Card>
  );
}
