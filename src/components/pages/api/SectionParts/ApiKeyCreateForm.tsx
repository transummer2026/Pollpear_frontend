import { useState } from "react";
import { KeyRound } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ApiKeyCreateSchema,
  type ApiKeyCreateDTO,
} from "@shared/schemas/api-key.schema";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ConfirmCopy } from "@/components/pages/api/apiKey";
import ConfirmBody from "@/components/pages/api/SectionParts/ConfirmBody";
import FieldError from "@/components/pages/api/SectionParts/FieldError";

export default function ApiKeyCreateForm({
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
