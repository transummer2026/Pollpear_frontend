import { Badge } from "@/components/ui/badge";
import { Lock, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSWRConfig } from "swr";
import { toast } from "sonner";
import type { RoomReadDTO } from "@shared/schemas/rooms.schema";
import { ApiError } from "@/lib/fetcher";
import { useMe } from "@/hooks/user/use-me";
import { useRoomDelete, useRoomUpdate } from "@/hooks/room/use-room";
import { isRoomClosed, isRoomOwnedBy } from "@/lib/room";
import RoomUpdateDialog from "@/components/room/RoomPage/Section/RoomUpdateDialog";
import RoomCloseDeleteConfirm, {
  type RoomConfirmAction,
} from "@/components/room/RoomPage/Section/RoomCloseDeleteConfirm";

const CLOSE_MARGIN_MS = 5_000;

type RoomOwnerButtonsProps = {
  room: RoomReadDTO;
};

export default function RoomOwnerButtons({ room }: RoomOwnerButtonsProps) {
  const { data: me } = useMe();
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  const { trigger: triggerDelete, isMutating: isDeleting } = useRoomDelete(
    room.id,
  );
  const { trigger: triggerUpdate, isMutating: isClosing } = useRoomUpdate(
    room.id,
  );
  const [isEditing, setIsEditing] = useState(false);
  const [confirming, setConfirming] = useState<RoomConfirmAction | null>(null);

  if (!isRoomOwnedBy(room, me?.id)) return null;

  const isMutating = isDeleting || isClosing;
  const isClosed = isRoomClosed(room);

  const handleDelete = async () => {
    await triggerDelete();
    await mutate(`/rooms/${room.id}`, undefined, { revalidate: false });
    await mutate(
      (key) =>
        typeof key === "string" &&
        key.startsWith("/rooms") &&
        key !== `/rooms/${room.id}`,
    );
    toast.success("Room has been deleted");
    navigate("/feed", { replace: true });
  };

  const handleClose = async () => {
    await triggerUpdate({ endsAt: new Date(Date.now() + CLOSE_MARGIN_MS) });
    await mutate((key) => typeof key === "string" && key.startsWith("/rooms"));
    toast.success("Room has been closed");
  };

  const handleConfirm = async (action: RoomConfirmAction) => {
    try {
      if (action === "delete") await handleDelete();
      else await handleClose();
      setConfirming(null);
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  };

  return (
    <>
      <div className="flex gap-2">
        {!isClosed && (
          <>
            <Badge
              variant="secondary"
              aria-label="Edit room"
              className="group rounded-full border-2 shadow-md cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4 transition-transform group-hover:rotate-12" />
            </Badge>

            <Badge
              variant="outline"
              aria-label="Close room"
              className="group rounded-full border-2 shadow-md cursor-pointer"
              onClick={() => setConfirming("close")}
            >
              <Lock className="h-4 w-4 transition-transform group-hover:scale-110" />
            </Badge>
          </>
        )}

        <Badge
          variant="destructive"
          aria-label="Delete room"
          className="cursor-pointer"
          onClick={() => setConfirming("delete")}
        >
          <Trash />
        </Badge>
      </div>

      <RoomUpdateDialog
        room={room}
        open={isEditing}
        onOpenChange={setIsEditing}
      />

      <RoomCloseDeleteConfirm
        action={confirming}
        onActionChange={setConfirming}
        onConfirm={handleConfirm}
        isMutating={isMutating}
        canClose={!isClosed}
      />
    </>
  );
}
