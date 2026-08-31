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

/**
 * Edit dialog, one form per poll type. The form is only mounted while the
 * dialog is open, so each opening starts from the poll as it now stands rather
 * than from the values left behind by the previous edit.
 */
export default function PollUpdateDialog({
  poll,
  open,
  onOpenChange,
}: PollUpdateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* minmax(0,…): the description textarea is field-sizing-content, without
          a floored column a long line widens the track instead of wrapping */}
      <DialogContent className="max-h-[90svh] grid-cols-[minmax(0,1fr)] overflow-y-auto sm:max-w-2xl">
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
