import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { ConfirmCopy } from "@/components/pages/api/apiKey";

/** The inside of a confirmation dialog, shared by the page's destructive actions. */
export default function ConfirmBody({
  copy,
  label,
  disabled,
  onConfirm,
}: Readonly<{
  copy: ConfirmCopy;
  label: string;
  disabled: boolean;
  onConfirm: () => void;
}>) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{copy.title}</AlertDialogTitle>
        <AlertDialogDescription>{copy.description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm} disabled={disabled}>
          {label}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
