import { LockedIcon, TrashIcon } from "@/components/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export type RoomConfirmAction = "close" | "delete";

// Both dialogs share a shape and differ only in wording, so the copy is a table
// rather than two components.
const COPY: Record<
  RoomConfirmAction,
  { title: string; question: string; consequence: string; confirm: string }
> = {
  delete: {
    title: "Delete this room?",
    question: "Are you sure you want to delete this room?",
    consequence: "You won't be able to access the room information anymore.",
    confirm: "Delete room",
  },
  close: {
    title: "Close this room?",
    question: "Are you sure you want to close this room?",
    consequence:
      "You won't be able to create poll, add friend or vote, but the informations will still be accessible.",
    confirm: "Close room",
  },
};

type RoomCloseDeleteConfirmProps = {
  action: RoomConfirmAction | null;
  onActionChange: (action: RoomConfirmAction | null) => void;
  onConfirm: (action: RoomConfirmAction) => void;
  isMutating?: boolean;
  canClose?: boolean;
};

/**
 * Confirmation before closing or deleting a room. Which one it asks about is
 * carried by `action`, `null` meaning the dialog is shut — one piece of state
 * instead of an open flag plus a mode that could disagree with it.
 */
export default function RoomCloseDeleteConfirm({
  action,
  onActionChange,
  onConfirm,
  isMutating = false,
  canClose = true,
}: RoomCloseDeleteConfirmProps) {
  const isDelete = action === "delete";
  const copy = COPY[action ?? "close"];

  return (
    <AlertDialog
      open={action !== null}
      onOpenChange={(open) => !open && onActionChange(null)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            {isDelete ? (
              <TrashIcon className="text-destructive" />
            ) : (
              <LockedIcon className="text-muted-foreground" />
            )}
          </AlertDialogMedia>
          <AlertDialogTitle>{copy.title}</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <span className="block">{copy.question}</span>
            <span className="block">{copy.consequence}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel type="button" disabled={isMutating}>
            Cancel
          </AlertDialogCancel>

          {isDelete && canClose && (
            <AlertDialogAction
              type="button"
              variant="outline"
              disabled={isMutating}
              onClick={(event) => {
                event.preventDefault();
                onConfirm("close");
              }}
            >
              Close it instead
            </AlertDialogAction>
          )}

          <AlertDialogAction
            type="button"
            variant={isDelete ? "destructive" : "default"}
            disabled={isMutating}
            onClick={(event) => {
              event.preventDefault();
              onConfirm(isDelete ? "delete" : "close");
            }}
          >
            {copy.confirm}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
