import { Link } from "react-router";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatRoomDate, isRoomClosed } from "@/lib/room";
import type { RoomReadDTO } from "@shared/schemas/rooms.schema";

type RoomInfoCardProps = {
  room: RoomReadDTO;
};

export default function RoomInfoCard({ room }: RoomInfoCardProps) {
  const isClosed = isRoomClosed(room);

  return (
    <Card>
      <CardHeader className="space-y-2">
        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
          <CardTitle className="text-lg font-bold">{room.name}</CardTitle>
          <CardAction className="flex gap-2">
            <Badge variant={isClosed ? "secondary" : "default"}>
              {isClosed ? "Closed" : "Active"}
            </Badge>
            <Badge variant="outline">{room.visibility}</Badge>
          </CardAction>
        </div>
        <CardDescription>
          {room.description || "No description yet"}
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="grid grid-cols-2 gap-4 text-sm lg:grid-cols-4">
        <div>
          <p className="text-muted-foreground">Pearent</p>
          {room.createdBy ? (
            <Link
              to={`/users/${room.createdBy.id}`}
              className="font-medium hover:underline"
            >
              {room.createdBy.username}
            </Link>
          ) : (
            <p className="font-medium">Deleted user</p>
          )}
        </div>
        <div>
          <p className="text-muted-foreground">Created</p>
          <p className="font-medium">{formatRoomDate(room.createdAt)}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Ends</p>
          <p className="font-medium">{formatRoomDate(room.endsAt)}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Polls</p>
          <p className="font-medium">{room.polls.length}</p>
        </div>
      </CardContent>
    </Card>
  );
}
