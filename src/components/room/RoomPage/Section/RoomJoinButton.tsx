import { LogIn } from "lucide-react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { Badge } from "@/components/ui/badge";
import { useIsRoomMember, useJoinRoom } from "@/hooks/room/use-pearticipants";
import { ApiError } from "@/lib/fetcher";
import { isRoomClosed } from "@/lib/room";
import type { RoomReadDTO } from "@shared/schemas/rooms.schema";

type RoomJoinButtonProps = {
  room: RoomReadDTO;
};

/**
 * Walk into a public room, or step back into one you left. Private rooms are
 * invitation-only, so this never shows for them — that path is
 * RoomInvitationBanner's accept. `roomMembers` carries the viewer's own row,
 * so `useIsRoomMember` flips as soon as the post-join revalidation lands and
 * the button hides itself.
 */
export default function RoomJoinButton({ room }: RoomJoinButtonProps) {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useJoinRoom(room.id);
  const isMember = useIsRoomMember(room);

  if (isMember || room.visibility !== "public" || isRoomClosed(room)) {
    return null;
  }

  const join = async () => {
    if (isMutating) return;
    try {
      await trigger();
      await mutate(`/rooms/${room.id}`);
      await mutate("/rooms");
      toast.success(`You joined ${room.name}`);
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  };

  return (
    <Badge
      variant="default"
      aria-label={`Join ${room.name}`}
      className="group rounded-full border-2 shadow-md cursor-pointer"
      onClick={join}
    >
      <LogIn className="h-4 w-4 transition-transform group-hover:scale-110" />
    </Badge>
  );
}
