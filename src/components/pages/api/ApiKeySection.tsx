import { useState } from "react";
import { KeyRound, RefreshCw } from "lucide-react";

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

//TODO: remplcer par la vrais api key et la vrai date d'expiration
const MOCK_API_KEY = "test_ssss";
const KEY_LIFETIME_MS = 365 * 24 * 60 * 60 * 1000;

type ApiKeyMeta = {
  createdAt: Date;
  expiresAt: Date;
};

function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ApiKeySection() {
  const [meta, setMeta] = useState<ApiKeyMeta | null>(null);
  const [revealedKey, setRevealedKey] = useState<string | null>(null);

  function issueKey() {
    const createdAt = new Date();

    setMeta({
      createdAt,
      expiresAt: new Date(createdAt.getTime() + KEY_LIFETIME_MS),
    });
    setRevealedKey(MOCK_API_KEY);
  }

  return (
    <section className="space-y-3">
      <div className="space-y-1">
        <h2 className="flex items-center gap-2 font-medium">
          <KeyRound size={18} />
          API key
        </h2>
        <p className="text-sm text-muted-foreground">
          {meta
            ? "Your key is active. It is stored hashed, so it cannot be displayed again."
            : "You do not have an API key yet."}
        </p>
      </div>

      {meta ? (
        <div className="space-y-4">
          <dl className="grid gap-x-6 gap-y-1 text-sm sm:grid-cols-[auto_1fr]">
            <dt className="text-muted-foreground">Created</dt>
            <dd>{formatDate(meta.createdAt)}</dd>
            <dt className="text-muted-foreground">Expires</dt>
            <dd>{formatDate(meta.expiresAt)}</dd>
          </dl>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
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
      ) : (
        <Button onClick={issueKey}>
          <KeyRound size={16} />
          Request an API key
        </Button>
      )}

      <ApiKeyDialog apiKey={revealedKey} onClose={() => setRevealedKey(null)} />
    </section>
  );
}
