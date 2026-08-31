import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Vote } from "lucide-react";
import PollResult from "@/components/poll/pollResult/PollResult";
import { usePollResults } from "@/hooks/poll/use-poll";

type PollResultCardProps = {
  pollId: number;
  title: string;
  votedOptionId?: number | null;
};

/**
 * Compact results, for reading a poll outside its own card — the voted list on
 * a profile, where the viewer's own answer is worth pointing out. The full card
 * is pollResult/PollResultCard.
 */
export default function PollResultCard({
  pollId,
  title,
  votedOptionId,
}: PollResultCardProps) {
  const { data: results, error } = usePollResults(pollId);

  return (
    <Card size="sm" className="mx-auto p-4 space-y-3 poll-card-sunken ring-0">
      <h2 className="text-sm font-bold">{title}</h2>

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
                    text: option.text,
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
