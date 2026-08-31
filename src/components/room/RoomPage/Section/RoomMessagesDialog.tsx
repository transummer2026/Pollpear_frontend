import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import RoomMessages from "./RoomMessages";

type RoomMessagesDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/** The same chat panel as on desktop, in the sheet mobile opens it from. */
export default function RoomMessagesDialog({
  open,
  onOpenChange,
}: RoomMessagesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-transparent p-0 ring-0">
        <DialogTitle className="sr-only">Messages</DialogTitle>
        <RoomMessages className="h-[70svh] lg:h-[70svh]" />
      </DialogContent>
    </Dialog>
  );
}
