import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { UseFormRegisterReturn } from "react-hook-form";

type PollDescriptionProps = {
  register: UseFormRegisterReturn;
  error?: string;
};

export default function PollDescription({
  register,
  error,
}: PollDescriptionProps) {
  return (
    <div className="space-y-2">
      <Label>
        Description
        <span className="text-muted-foreground"> optional</span>
      </Label>

      <Textarea placeholder="Write a description..." {...register} />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
