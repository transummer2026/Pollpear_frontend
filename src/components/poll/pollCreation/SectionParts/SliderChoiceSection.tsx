import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { CardTitle } from "@/components/ui/card";
import type { SliderFormValues } from "@/components/poll/pollCreation/pollForm";

type ScaleChoiceSectionProps = {
  register: UseFormRegister<SliderFormValues>;
  errors: FieldErrors<SliderFormValues>;
};

export default function SliderChoiceSection({
  register,
  errors,
}: ScaleChoiceSectionProps) {
  const optionErrors = errors.options?.[0];

  return (
    <div className="space-y-5 flex flex-col w-full">
      <CardTitle>Scale</CardTitle>
      <div className="space-y-2">
        <Input
          id="scale-label"
          type="hidden"
          {...register("options.0.text" as const)}
        />
        {optionErrors?.text && (
          <p className="text-sm text-destructive">
            {optionErrors.text.message}
          </p>
        )}
      </div>
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        disabled
        className="mx-auto w-full"
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="scale-left">Left label</Label>
          <Input
            id="scale-left"
            placeholder="Disagree"
            {...register("options.0.sliderLeftLabel" as const)}
          />
          {optionErrors?.sliderLeftLabel && (
            <p className="text-sm text-destructive">
              {optionErrors.sliderLeftLabel.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="scale-right" className="block text-right">
            Right label
          </Label>
          <Input
            id="scale-right"
            placeholder="Agree"
            className="text-right"
            {...register("options.0.sliderRightLabel" as const)}
          />
          {optionErrors?.sliderRightLabel && (
            <p className="text-sm text-destructive text-right">
              {optionErrors.sliderRightLabel.message}
            </p>
          )}
        </div>
      </div>

      {errors.options && (
        <p className="text-sm text-destructive">
          {errors.options.root?.message ?? errors.options.message}
        </p>
      )}
    </div>
  );
}
