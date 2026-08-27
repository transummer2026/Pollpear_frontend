import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { RoomReadDTO } from "@shared/schemas/rooms.schema";
import RoomMessages from "./RoomMessages";

type RoomMessagesDialogProps = {
  room: RoomReadDTO;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function RoomMessagesDialog({
  room,
  open,
  onOpenChange,
}: RoomMessagesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-transparent p-0 ring-0">
        <DialogTitle className="sr-only">Messages</DialogTitle>
        <RoomMessages room={room} className="h-[70svh] lg:h-[70svh]" />
      </DialogContent>
    </Dialog>
  );
}
