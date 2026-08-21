import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PollReadDTO } from "@shared/schemas/polls.schema";
import { isPollClosed } from "@/lib/poll";
import PollUpdateButtons from "@/components/poll/pollUpdate/PollUpdateButtons";

export default function PollCardHeader({ poll }: { poll: PollReadDTO }) {
  const isClosed = isPollClosed(poll);

  return (
    <CardContent className="flex items-center justify-between gap-2 p-0">
      <Badge variant={isClosed ? "destructive" : "default"}>
        {isClosed ? "Closed" : "Open"}
      </Badge>

      <PollUpdateButtons poll={poll} />
    </CardContent>
  );
}
