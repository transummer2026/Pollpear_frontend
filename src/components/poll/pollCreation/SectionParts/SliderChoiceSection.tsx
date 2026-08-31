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

/**
 * The scale of a slider poll: two end labels, and a disabled slider that only
 * shows what the result will look like. The option's `text` is hidden here —
 * it carries a fixed placeholder (see SLIDER_OPTION_TEXT), since a scale has
 * nothing to name.
 */
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
        className="mx-auto w-full [&_[data-slot=slider-range]]:bg-[#6F8459] [&_[data-slot=slider-track]]:bg-[#D4E7CB]"
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
