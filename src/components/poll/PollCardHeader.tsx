import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PollReadDTO } from "@shared/schemas/polls.schema";
import { isPollClosed } from "@/lib/poll";
import PollUpdateButtons from "@/components/poll/pollUpdate/PollUpdateButtons";

type PollCardHeaderProps = {
  poll: PollReadDTO;
  /** omitted when the card offers no vote/result toggle */
  onToggleResults?: () => void;
  showingResults?: boolean;
};

export default function PollCardHeader({
  poll,
  onToggleResults,
  showingResults = false,
}: PollCardHeaderProps) {
  const isClosed = isPollClosed(poll);

  return (
    <CardContent className="flex items-center justify-between gap-2 p-0">
      <Badge variant={isClosed ? "closed" : "open"}>
        {isClosed ? "Closed" : "Open"}
      </Badge>

      <div className="flex items-center gap-2">
        {onToggleResults && (
          <Button
            type="button"
            variant="outline"
            size="xs"
            onClick={onToggleResults}
          >
            {showingResults ? "Vote" : "Show results"}
          </Button>
        )}

        <PollUpdateButtons poll={poll} />
      </div>
    </CardContent>
  );
}
