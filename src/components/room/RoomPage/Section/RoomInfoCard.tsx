import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import RoomOwnerButtons from "@/components/room/RoomPage/Section/RoomOwnerButtons";
import {
  formatRoomDate,
  formatRoomDeadline,
  isRoomClosed,
  isRoomDeadlineNear,
} from "@/lib/room";
import type { RoomReadDTO } from "@shared/schemas/rooms.schema";

type RoomInfoCardProps = {
  room: RoomReadDTO;
};

export default function RoomInfoCard({ room }: RoomInfoCardProps) {
  const isClosed = isRoomClosed(room);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge variant={isClosed ? "secondary" : "default"}>
              {isClosed ? "Closed" : "Active"}
            </Badge>
            <Badge variant="outline">{room.visibility}</Badge>
          </div>

          <RoomOwnerButtons room={room} />
        </div>

        <CardTitle className="text-lg font-bold">{room.name}</CardTitle>
        <CardDescription>
          {room.description || "No description yet"}
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm lg:grid-cols-4">
        <div className="flex items-baseline gap-2">
          <span className="text-muted-foreground">Pearent</span>
          {room.createdBy ? (
            <Link
              to={`/users/${room.createdBy.id}`}
              className="truncate font-medium hover:underline"
            >
              {room.createdBy.username}
            </Link>
          ) : (
            <span className="font-medium">Deleted user</span>
          )}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-muted-foreground">Created</span>
          <span className="font-medium">{formatRoomDate(room.createdAt)}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-muted-foreground">Ends</span>
          {isRoomDeadlineNear(room.endsAt) ? (
            <Tooltip>
              <TooltipTrigger className="font-medium">
                {formatRoomDeadline(room.endsAt)}
              </TooltipTrigger>
              <TooltipContent>{formatRoomDate(room.endsAt)}</TooltipContent>
            </Tooltip>
          ) : (
            <span className="font-medium">
              {formatRoomDeadline(room.endsAt)}
            </span>
          )}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-muted-foreground">Polls</span>
          <span className="font-medium">{room.polls.length}</span>
        </div>
      </CardContent>
    </Card>
  );
}
