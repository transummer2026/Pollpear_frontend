import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PollReadDTO } from "@shared/schemas/polls.schema";
import PollUpdateFormSingleMultipleChoice from "@/components/poll/pollUpdate/PollUpdateFormSingleMultipleChoice";
import PollUpdateFormSlider from "@/components/poll/pollUpdate/PollUpdateFormSlider";

type PollUpdateDialogProps = {
  poll: PollReadDTO;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function PollUpdateDialog({
  poll,
  open,
  onOpenChange,
}: PollUpdateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit poll</DialogTitle>
        </DialogHeader>
        {open &&
          (poll.type === "slider" ? (
            <PollUpdateFormSlider
              poll={poll}
              onCancel={() => onOpenChange(false)}
              onUpdated={() => onOpenChange(false)}
            />
          ) : (
            <PollUpdateFormSingleMultipleChoice
              poll={poll}
              onCancel={() => onOpenChange(false)}
              onUpdated={() => onOpenChange(false)}
            />
          ))}
      </DialogContent>
    </Dialog>
  );
}
