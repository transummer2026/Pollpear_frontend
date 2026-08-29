import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import {
  LockedIcon,
  OpenTrashIcon,
  TrashIcon,
  UnlockedIcon,
} from "@/components/icons";
import { HoverIcon } from "@/components/icons/HoverIcon";
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
            <Button
              type="button"
              size="icon"
              variant="secondary"
              aria-label="Edit room"
              title="Edit room"
              className="group cursor-pointer rounded-full shadow-md"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="transition-transform group-hover:rotate-12" />
            </Button>

            <Button
              type="button"
              size="icon"
              variant="outline"
              aria-label="Close room"
              title="Close room"
              className="group cursor-pointer rounded-full shadow-md"
              onClick={() => setConfirming("close")}
            >
              <HoverIcon idle={UnlockedIcon} hover={LockedIcon} />
            </Button>
          </>
        )}

        <Button
          type="button"
          size="icon"
          variant="destructive"
          aria-label="Delete room"
          title="Delete room"
          className="group cursor-pointer rounded-full shadow-md"
          onClick={() => setConfirming("delete")}
        >
          <HoverIcon idle={TrashIcon} hover={OpenTrashIcon} />
        </Button>
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
