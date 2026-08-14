import { useState } from "react";
import { KeyRound, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { ApiError } from "@/lib/fetcher";
import { useApiKey, useApiKeyCreate } from "@/hooks/me/use-api-key";
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

export default function ApiKeySection() {
  const { data: apiKey, isLoading } = useApiKey();
  const { trigger, isMutating } = useApiKeyCreate();
  const [revealedKey, setRevealedKey] = useState<string | null>(null);

  async function issueKey() {
    try {
      const issued = await trigger({});
      setRevealedKey(issued.key);
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
          {apiKey
            ? "Your key is active. It is stored hashed, so it cannot be displayed again."
            : "You do not have an API key yet."}
        </p>
      </div>

      {isLoading && (
        <p className="text-sm text-muted-foreground">Loading your key...</p>
      )}

      {!isLoading && apiKey && (
        <div className="space-y-4">
          <dl className="grid gap-x-6 gap-y-1 text-sm sm:grid-cols-[auto_1fr]">
            <dt className="text-muted-foreground">Created</dt>
            <dd>{formatDate(apiKey.createdAt)}</dd>
            <dt className="text-muted-foreground">Expires</dt>
            <dd>{formatDate(apiKey.expiredAt)}</dd>
          </dl>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" disabled={isMutating}>
                <RefreshCw size={16} />
                Regenerate key
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Regenerate your API key?</AlertDialogTitle>
                <AlertDialogDescription>
                  Your current key is revoked immediately. Anything still
                  calling the API with it stops working until you ship the new
                  one.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={issueKey}>
                  Regenerate
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}

      {!isLoading && !apiKey && (
        <Button onClick={issueKey} disabled={isMutating}>
          <KeyRound size={16} />
          Request an API key
        </Button>
      )}

      <ApiKeyDialog apiKey={revealedKey} onClose={() => setRevealedKey(null)} />
    </section>
  );
}
