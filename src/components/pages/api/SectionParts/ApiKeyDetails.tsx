import { RefreshCw } from "lucide-react";
import { TrashIcon } from "@/components/icons";

import type { ApiKeyDTO } from "@shared/schemas/api-key.schema";
import { formatDate } from "@/components/pages/api/apiKey";
import ApiKeyName from "@/components/pages/api/SectionParts/ApiKeyName";
import ConfirmedAction from "@/components/pages/api/SectionParts/ConfirmedAction";

export default function ApiKeyDetails({
  apiKey,
  busy,
  onRegenerate,
  onDelete,
}: Readonly<{
  apiKey: ApiKeyDTO;
  busy: boolean;
  onRegenerate: () => void;
  onDelete: () => void;
}>) {
  return (
    <div className="space-y-4">
      <ApiKeyName apiKey={apiKey} busy={busy} />

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
          copy={{
            title: "Regenerate your API key?",
            description:
              "Your current key is revoked immediately and the new one keeps the same name. Anything still calling the API with the old key stops working until you ship the new one.",
          }}
          disabled={busy}
          onConfirm={onRegenerate}
        />
        <ConfirmedAction
          variant="destructive"
          icon={<TrashIcon className="size-4" />}
          label="Delete key"
          copy={{
            title: "Delete your API key?",
            description:
              "The key is revoked immediately and nothing replaces it. Anything calling the API with it stops working, and you will need to request a new key to call the API again.",
          }}
          disabled={busy}
          onConfirm={onDelete}
        />
      </div>
    </div>
  );
}
