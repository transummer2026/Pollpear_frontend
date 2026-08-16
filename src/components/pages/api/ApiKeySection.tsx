import { useState } from "react";
import { KeyRound } from "lucide-react";
import { toast } from "sonner";

import type { ApiKeyCreateDTO } from "@shared/schemas/api-key.schema";
import {
  useApiKey,
  useApiKeyCreate,
  useApiKeyRevoke,
} from "@/hooks/me/use-api-key";
import { describeState, reportError } from "@/components/pages/api/apiKey";
import ApiKeyCreateForm from "@/components/pages/api/SectionParts/ApiKeyCreateForm";
import ApiKeyDetails from "@/components/pages/api/SectionParts/ApiKeyDetails";
import ApiKeyDialog from "@/components/pages/api/SectionParts/ApiKeyDialog";

export default function ApiKeySection() {
  const { data: apiKey, isLoading, error } = useApiKey();
  const { trigger, isMutating } = useApiKeyCreate();
  const { trigger: revoke, isMutating: isRevoking } = useApiKeyRevoke();
  const [revealedKey, setRevealedKey] = useState<string | null>(null);

  const failed = Boolean(error);
  const settled = !isLoading && !failed;
  const busy = isMutating || isRevoking;

  async function issueKey(body: ApiKeyCreateDTO) {
    try {
      const issued = await trigger(body);
      if (issued) {
        setRevealedKey(issued.key);
      }
    } catch (e) {
      reportError(e);
    }
  }

  async function revokeKey() {
    try {
      await revoke();
      toast.success("API key deleted");
    } catch (e) {
      reportError(e);
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
        <ApiKeyCreateForm
          busy={busy}
          label="Request a key anyway"
          onCreate={issueKey}
          confirm={{
            title: "Request a key without checking the current one?",
            description:
              "We could not read your key status. If you already have a key, requesting a new one revokes it immediately and anything calling the API with it stops working.",
          }}
        />
      )}

      {settled && apiKey && (
        <ApiKeyDetails
          apiKey={apiKey}
          busy={busy}
          onRegenerate={() => issueKey({ appName: apiKey.appName })}
          onDelete={revokeKey}
        />
      )}

      {settled && !apiKey && (
        <ApiKeyCreateForm
          busy={busy}
          label="Request an API key"
          onCreate={issueKey}
        />
      )}

      <ApiKeyDialog apiKey={revealedKey} onClose={() => setRevealedKey(null)} />
    </section>
  );
}
