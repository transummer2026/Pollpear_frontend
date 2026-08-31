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
import RoomJoinButton from "@/components/room/RoomPage/Section/RoomJoinButton";
import RoomLeaveButton from "@/components/room/RoomPage/Section/RoomLeaveButton";
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

/**
 * The room's header: what it is, and what the viewer may do with it. The three
 * action buttons each decide on their own whether they apply — owner, member or
 * outsider — so this only has to lay them out.
 */
export default function RoomInfoCard({ room }: RoomInfoCardProps) {
  const isClosed = isRoomClosed(room);

  return (
    <Card className="ring-0">
      <CardHeader className="grid-cols-[minmax(0,1fr)]">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge variant={isClosed ? "closed" : "open"}>
              {isClosed ? "Closed" : "Active"}
            </Badge>
            <Badge variant="outline">{room.visibility}</Badge>
          </div>

          <div className="flex items-center gap-2">
            <RoomJoinButton room={room} />
            <RoomLeaveButton room={room} />
            <RoomOwnerButtons room={room} />
          </div>
        </div>

        <CardTitle className="text-lg font-bold wrap-anywhere">
          {room.name}
        </CardTitle>
        <CardDescription className="wrap-anywhere">
          {room.description || "No description yet"}
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm lg:grid-cols-4">
        <div className="flex items-baseline gap-2">
          <span className="text-muted-foreground">Created by</span>
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
