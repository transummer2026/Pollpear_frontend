import { useState } from "react";
import { Pencil } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ApiKeyUpdateSchema,
  type ApiKeyDTO,
  type ApiKeyUpdateDTO,
} from "@shared/schemas/api-key.schema";
import { useApiKeyUpdate } from "@/hooks/me/use-api-key";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { reportError } from "@/components/pages/api/apiKey";
import FieldError from "@/components/pages/api/SectionParts/FieldError";

export default function ApiKeyName({
  apiKey,
  busy,
}: Readonly<{ apiKey: ApiKeyDTO; busy: boolean }>) {
  const [isEditing, setIsEditing] = useState(false);
  const { trigger, isMutating } = useApiKeyUpdate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApiKeyUpdateDTO>({
    resolver: zodResolver(ApiKeyUpdateSchema),
    values: { appName: apiKey.appName },
    resetOptions: { keepDirtyValues: true },
  });

  const onSubmit: SubmitHandler<ApiKeyUpdateDTO> = async (data) => {
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
