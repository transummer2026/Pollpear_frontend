import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type EndsInSettingProps = {
  days: number;
  initialDays: number;
  setDays: (days: number) => void;
};

export default function EndsInSetting({
  days,
  initialDays,
  setDays,
}: EndsInSettingProps) {
  return (
    <div className="space-y-2">
      <Label>Ends in</Label>

      <div className="flex items-center gap-3">
        <Input
          type="number"
          min={1}
          max={365}
          className="w-28"
          value={days}
          onChange={(e) => {
            const value = Number(e.target.value);

            if (value >= 1 && value <= 5) {
              setDays(value);
            } else if (e.target.value !== "") {
              setDays(initialDays);
            }
          }}
        />

        <span className="text-sm text-muted-foreground">days</span>
      </div>
    </div>
  );
}
