import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { RoomReadDTO } from "@shared/schemas/rooms.schema";
import RoomUpdateForm from "./RoomUpdateForm";

type RoomUpdateDialogProps = {
  room: RoomReadDTO;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function RoomUpdateDialog({
  room,
  open,
  onOpenChange,
}: RoomUpdateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit room</DialogTitle>
        </DialogHeader>
        {open && (
          <RoomUpdateForm
            room={room}
            onCancel={() => onOpenChange(false)}
            onUpdated={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
