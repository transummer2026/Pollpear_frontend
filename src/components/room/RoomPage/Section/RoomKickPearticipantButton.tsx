import { UserMinus } from "lucide-react";
import RoomPearticipantRemoveButton from "@/components/room/RoomPage/Section/RoomPearticipantRemoveButton";

type RoomKickPearticipantButtonProps = {
  roomId: number;
  userId: number;
  username: string;
};

/**
 * Kicks an accepted member. Whether the viewer may kick is decided by the
 * parent (`RoomPearticipants` only mounts this for the owner, on a room that
 * isn't closed, and never for the owner's own row), so there's nothing left to
 * gate here — it just wires the shared remove button to the participants route.
 */
export default function RoomKickPearticipantButton({
  roomId,
  userId,
  username,
}: RoomKickPearticipantButtonProps) {
  return (
    <RoomPearticipantRemoveButton
      roomId={roomId}
      userId={userId}
      mode="participant"
      label={`Remove ${username} from the room`}
      successMessage={`${username} has been removed from the room`}
      icon={<UserMinus className="h-3 w-3" />}
      variant="destructive"
    />
  );
}
