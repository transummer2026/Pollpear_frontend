import { useState, type ReactNode } from "react";
import { KeyRound, Pencil, RefreshCw, Trash } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { VariantProps } from "class-variance-authority";
import { toast } from "sonner";

import {
  ApiKeyCreateSchema,
  ApiKeyRenameSchema,
  type ApiKeyCreateDTO,
  type ApiKeyDTO,
  type ApiKeyRenameDTO,
} from "@shared/schemas/api-key.schema";
import { ApiError } from "@/lib/fetcher";
import {
  useApiKey,
  useApiKeyCreate,
  useApiKeyRename,
  useApiKeyRevoke,
} from "@/hooks/me/use-api-key";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];

type ConfirmCopy = { title: string; description: string };

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

function reportError(e: unknown) {
  if (e instanceof ApiError) toast.error(e.message);
  else toast.error("An unknown error occurred");
}

function FieldError({ message }: Readonly<{ message?: string }>) {
  if (!message) return null;
  return <p className="text-destructive text-sm">{message}</p>;
}

function ConfirmBody({
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

/**
 * Every action here either revokes a working key or replaces it, so none of
 * them fires on a single click
 */
function ConfirmedAction({
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

function ApiKeyName({
  apiKey,
  busy,
}: Readonly<{ apiKey: ApiKeyDTO; busy: boolean }>) {
  const [isEditing, setIsEditing] = useState(false);
  const { trigger, isMutating } = useApiKeyRename();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApiKeyRenameDTO>({
    resolver: zodResolver(ApiKeyRenameSchema),
    values: { appName: apiKey.appName },
    resetOptions: { keepDirtyValues: true },
  });

  const onSubmit: SubmitHandler<ApiKeyRenameDTO> = async (data) => {
    try {
      await trigger(data);
      setIsEditing(false);
    } catch (e) {
      reportError(e);
    }
  };

  function cancel() {
    reset({ appName: apiKey.appName });
    setIsEditing(false);
  }

  if (!isEditing) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Name</span>
        <span className="font-medium">{apiKey.appName}</span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Rename API key"
          onClick={() => setIsEditing(true)}
          disabled={busy}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-1.5">
      <Label htmlFor="renameAppName">Name</Label>
      <div className="flex flex-wrap items-center gap-2">
        <Input
          id="renameAppName"
          className="max-w-xs"
          {...register("appName")}
        />
        <Button type="button" variant="outline" onClick={cancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isMutating}>
          Save
        </Button>
      </div>
      <FieldError message={errors.appName?.message} />
    </form>
  );
}

function ApiKeyCreateForm({
  busy,
  label,
  onCreate,
  confirm,
}: Readonly<{
  busy: boolean;
  label: string;
  onCreate: (body: ApiKeyCreateDTO) => void;
  confirm?: ConfirmCopy;
}>) {
  const [confirming, setConfirming] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ApiKeyCreateDTO>({
    resolver: zodResolver(ApiKeyCreateSchema),
  });

  const onSubmit: SubmitHandler<ApiKeyCreateDTO> = (data) => {
    if (confirm) {
      setConfirming(true);
      return;
    }
    onCreate(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="appName">Application name</Label>
          <Input
            id="appName"
            className="max-w-xs"
            placeholder="default"
            {...register("appName", {
              setValueAs: (value: string) => value.trim() || undefined,
            })}
          />
          <FieldError message={errors.appName?.message} />
        </div>
        <Button type="submit" disabled={busy}>
          <KeyRound size={16} />
          {label}
        </Button>
      </form>

      {confirm && (
        <AlertDialog open={confirming} onOpenChange={setConfirming}>
          <ConfirmBody
            copy={confirm}
            label={label}
            disabled={busy}
            onConfirm={() => onCreate(getValues())}
          />
        </AlertDialog>
      )}
    </>
  );
}

function ApiKeyDetails({
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
          icon={<Trash size={16} />}
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
