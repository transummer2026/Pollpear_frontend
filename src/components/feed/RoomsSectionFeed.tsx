import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRoomsFeed } from "@/hooks/room/use-room";
import { isRoomClosed } from "@/lib/room";

/**
 * Rooms worth walking into from the feed. `/rooms/feed` returns more than the
 * user's own — every public room too — and the closed ones are filtered out
 * here, since a closed room has nothing left to take part in.
 */
export default function RoomsSectionFeed() {
  const { data } = useRoomsFeed();

  if (!data) return null;

  const rooms = data.filter((room) => !isRoomClosed(room));

  return (
    <Card className="ring-0">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-lg">
          Active rooms
          <Badge variant="secondary" className="h-5 min-w-5 px-1.5">
            {rooms.length}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-1">
        {rooms.length === 0 ? (
          <p className="text-xs text-muted-foreground">No active room yet.</p>
        ) : (
          rooms.map((room) => (
            <Link
              key={room.id}
              to={`/rooms/${room.id}`}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-lg
                p-2
                text-left
                transition-colors
                hover:bg-muted
              "
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm truncate">{room.name}</p>

                <p className="text-xs text-muted-foreground">
                  {room.roomMembers.length} members
                </p>
              </div>
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  );
}
