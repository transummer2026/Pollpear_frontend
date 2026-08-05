import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CardTitle } from "@/components/ui/card";
import type { UseFormRegisterReturn } from "react-hook-form";

type TitleSettingProps = {
  register: UseFormRegisterReturn;
  error?: string;
};

export default function TitleSetting({ register, error }: TitleSettingProps) {
  return (
    <div className="space-y-2 col-span-3">
      <CardTitle>Infos</CardTitle>
      <Label>Title</Label>
      <Input placeholder="Poll title" {...register} />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
