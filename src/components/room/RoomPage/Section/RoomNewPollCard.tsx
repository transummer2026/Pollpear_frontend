import { Link } from "react-router";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { isRoomClosed } from "@/lib/room";
import type { RoomReadDTO } from "@shared/schemas/rooms.schema";

type RoomNewPollCardProps = {
  room: RoomReadDTO;
};

export default function RoomNewPollCard({ room }: RoomNewPollCardProps) {
  const isClosed = isRoomClosed(room);

  return (
    <Card>
      <CardContent>
        {isClosed ? (
          <Button className="w-full" disabled>
            <Plus />
            New poll
          </Button>
        ) : (
          <Button className="w-full" asChild>
            <Link to={`/polls/new?roomId=${room.id}`}>
              <Plus />
              New poll
            </Link>
          </Button>
        )}
        {isClosed && (
          <p className="mt-2 text-center text-xs text-muted-foreground">
            This room is closed
          </p>
        )}
      </CardContent>
    </Card>
  );
}
