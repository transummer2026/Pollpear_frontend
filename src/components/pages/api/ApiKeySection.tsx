import { useState, type ReactNode } from "react";
import { KeyRound, RefreshCw, Trash } from "lucide-react";
import { toast } from "sonner";

import type { ApiKeyDTO } from "@shared/schemas/api-key.schema";
import { ApiError } from "@/lib/fetcher";
import {
  useApiKey,
  useApiKeyCreate,
  useApiKeyRevoke,
} from "@/hooks/me/use-api-key";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ApiKeyDialog from "@/components/pages/api/ApiKeyDialog";

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function describeState(
  isLoading: boolean,
  failed: boolean,
  apiKey: ApiKeyDTO | null | undefined,
) {
  if (isLoading) return "Checking whether you already have a key.";
  if (failed) return "Your key status could not be loaded.";
  if (apiKey)
    return "Your key is active. It is stored hashed, so it cannot be displayed again.";
  return "You do not have an API key yet.";
}

type ConfirmedActionProps = {
  icon: ReactNode;
  label: string;
  title: string;
  description: string;
  disabled: boolean;
  onConfirm: () => void;
  variant?: "outline" | "destructive";
};

function ConfirmedAction({
  icon,
  label,
  title,
  description,
  disabled,
  onConfirm,
  variant = "outline",
}: ConfirmedActionProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={variant} disabled={disabled}>
          {icon}
          {label}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={disabled}>
            {label}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function ApiKeySection() {
  const { data: apiKey, isLoading, error } = useApiKey();
  const { trigger, isMutating } = useApiKeyCreate();
  const { trigger: revoke, isMutating: isRevoking } = useApiKeyRevoke();
  const [revealedKey, setRevealedKey] = useState<string | null>(null);

  const failed = Boolean(error);
  const settled = !isLoading && !failed;
  const busy = isMutating || isRevoking;

  async function issueKey() {
    try {
      const issued = await trigger({});
      if (issued) {
        setRevealedKey(issued.key);
      }
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  }

  async function revokeKey() {
    try {
      await revoke();
      toast.success("API key deleted");
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  }

  return (
    <section className="space-y-3">
      <div className="space-y-1">
        <h2 className="flex items-center gap-2 font-medium">
          <KeyRound size={18} />
          API key
        </h2>
        <p className="text-sm text-muted-foreground">
          {describeState(isLoading, failed, apiKey)}
        </p>
      </div>

      {failed && (
        <ConfirmedAction
          icon={<KeyRound size={16} />}
          label="Request a key anyway"
          title="Request a key without checking the current one?"
          description="We could not read your key status. If you already have a key, requesting a new one revokes it immediately and anything calling the API with it stops working."
          disabled={busy}
          onConfirm={issueKey}
        />
      )}

      {settled && apiKey && (
        <div className="space-y-4">
          <dl className="grid gap-x-6 gap-y-1 text-sm sm:grid-cols-[auto_1fr]">
            <dt className="text-muted-foreground">Created</dt>
            <dd>{formatDate(apiKey.createdAt)}</dd>
            <dt className="text-muted-foreground">Expires</dt>
            <dd>{formatDate(apiKey.expiredAt)}</dd>
          </dl>

          <div className="flex flex-wrap gap-2">
            <ConfirmedAction
              icon={<RefreshCw size={16} />}
              label="Regenerate key"
              title="Regenerate your API key?"
              description="Your current key is revoked immediately. Anything still calling the API with it stops working until you ship the new one."
              disabled={busy}
              onConfirm={issueKey}
            />
            <ConfirmedAction
              variant="destructive"
              icon={<Trash size={16} />}
              label="Delete key"
              title="Delete your API key?"
              description="The key is revoked immediately and nothing replaces it. Anything calling the API with it stops working, and you will need to request a new key to call the API again."
              disabled={busy}
              onConfirm={revokeKey}
            />
          </div>
        </div>
      )}

      {settled && !apiKey && (
        <Button onClick={issueKey} disabled={busy}>
          <KeyRound size={16} />
          Request an API key
        </Button>
      )}

      <ApiKeyDialog apiKey={revealedKey} onClose={() => setRevealedKey(null)} />
    </section>
  );
}
