import { Link } from "react-router";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type RoomAddPollCardProps = {
  roomId: number;
  className?: string;
};

/**
 * Persistent "add a poll" tile rendered as the first card of a room's poll
 * grid. Replaces the old room-aware "New Poll" navbar button: the navbar now
 * only creates public polls, room polls are added from here.
 */
export default function RoomAddPollCard({
  roomId,
  className,
}: RoomAddPollCardProps) {
  return (
    <Link
      to={`/polls/new?roomId=${roomId}`}
      aria-label="New poll"
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-foreground/15 bg-muted/20 py-10 text-muted-foreground transition-colors hover:border-foreground/30 hover:bg-muted/40 hover:text-foreground",
        className,
      )}
    >
      <Plus className="size-6" />
      <span className="text-sm font-medium">New poll</span>
    </Link>
  );
}
