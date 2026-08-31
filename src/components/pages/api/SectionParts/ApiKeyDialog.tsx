import { useState } from "react";
import { toast } from "sonner";
import { Check, Copy, TriangleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ApiKeyDialogProps = {
  apiKey: string | null;
  onClose: () => void;
};

/**
 * Shows a freshly issued key, once. The clipboard API needs a user gesture and
 * a secure context, so the copy can fail for reasons the user can do nothing
 * about — hence the fallback of selecting it by hand.
 */
export default function ApiKeyDialog({ apiKey, onClose }: ApiKeyDialogProps) {
  const [copied, setCopied] = useState(false);

  async function copyKey() {
    if (!apiKey) {
      return;
    }

    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      toast.success("API key copied to clipboard");
    } catch {
      toast.error("Could not copy the key, select and copy it manually");
    }
  }

  function close() {
    setCopied(false);
    onClose();
  }

  return (
    <Dialog open={apiKey !== null} onOpenChange={(open) => !open && close()}>
      <DialogContent
        showCloseButton={false}
        onEscapeKeyDown={(event) => event.preventDefault()}
        onPointerDownOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Your new API key</DialogTitle>
          <DialogDescription>
            Copy it now and store it somewhere safe.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2 truncate">
          <code className="flex-1 truncate rounded-md border bg-muted px-3 py-2 font-mono text-sm whitespace-nowrap">
            {apiKey}
          </code>
          <Button
            variant="outline"
            size="icon"
            onClick={copyKey}
            aria-label="Copy API key"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </Button>
        </div>

        <Alert variant="destructive">
          <TriangleAlert size={16} />
          <AlertTitle>This key will never be shown again</AlertTitle>
          <AlertDescription>
            Only a hash of it is stored. If you lose it, the only way out is to
            regenerate a new key.
          </AlertDescription>
        </Alert>

        <DialogFooter>
          <Button onClick={close}>I have copied the key</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
