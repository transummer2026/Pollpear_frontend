import type { ReactNode } from "react";

import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { ButtonVariant, ConfirmCopy } from "@/components/pages/api/apiKey";
import ConfirmBody from "@/components/pages/api/SectionParts/ConfirmBody";

/**
 * A button that asks before it acts. Every action on this page either revokes a
 * working key or replaces it, and both break whatever is calling the API right
 * now — so none of them fires on a single click.
 */
export default function ConfirmedAction({
  icon,
  label,
  copy,
  disabled,
  onConfirm,
  variant = "outline",
}: Readonly<{
  icon: ReactNode;
  label: string;
  copy: ConfirmCopy;
  disabled: boolean;
  onConfirm: () => void;
  variant?: ButtonVariant;
}>) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={variant} disabled={disabled}>
          {icon}
          {label}
        </Button>
      </AlertDialogTrigger>
      <ConfirmBody
        copy={copy}
        label={label}
        disabled={disabled}
        onConfirm={onConfirm}
      />
    </AlertDialog>
  );
}
