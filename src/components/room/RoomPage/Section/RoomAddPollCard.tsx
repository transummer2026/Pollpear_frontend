import { Link } from "react-router";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type RoomAddPollCardProps = {
  roomId: number;
  className?: string;
};

/**
 * Persistent "add a poll" tile rendered as the first card of a room's poll
 * grid. Styled like a vote card (same raised shadow, `size="sm"`, `p-4`)
 * with roughly the height of an average poll card, so it sits naturally
 * among the polls. Replaces the old room-aware "New Poll" navbar button:
 * the navbar now only creates public polls, room polls are added from here.
 */
export default function RoomAddPollCard({
  roomId,
  className,
}: RoomAddPollCardProps) {
  return (
    <Link
      to={`/polls/new?roomId=${roomId}`}
      aria-label="New poll"
      className={cn("group block w-full self-start", className)}
    >
      <Card
        size="sm"
        className="poll-card-raised ring-0 flex h-[17rem] flex-col items-center justify-center gap-3 p-4 text-center transition-transform group-hover:-translate-y-0.5"
      >
        <span className="flex size-36 items-center justify-center rounded-full border border-border bg-input/30 text-muted-foreground transition-colors group-hover:bg-input/50 group-hover:text-foreground">
          <Plus className="size-16" strokeWidth={2.5} />
        </span>
        <span className="text-base font-medium text-muted-foreground">
          New poll
        </span>
      </Card>
    </Link>
  );
}
