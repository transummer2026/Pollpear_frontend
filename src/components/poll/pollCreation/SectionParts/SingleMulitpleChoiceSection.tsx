import { useFieldArray } from "react-hook-form";
import type {
  Control,
  UseFormRegister,
  UseFormGetValues,
  FieldErrors,
} from "react-hook-form";
import { AddIcon, OpenTrashIcon, TrashIcon } from "@/components/icons";
import { HoverIcon } from "@/components/icons/HoverIcon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CardTitle } from "@/components/ui/card";
import type { PollCreateDTO } from "@shared/schemas/polls.schema";
import type { PollFormValues } from "@/components/poll/pollCreation/pollForm";

type SingleMultipleChoiceSectionProps = {
  control: Control<PollFormValues, unknown, PollCreateDTO>;
  register: UseFormRegister<PollFormValues>;
  getValues: UseFormGetValues<PollFormValues>;
  errors: FieldErrors<PollFormValues>;
};

/**
 * The two-to-five options of a choice poll. `order` is what the backend sorts
 * on, so removing one renumbers the rest through `replace` — leaving a gap
 * would work, but the orders would drift further apart at every edit.
 *
 * The bounds are enforced twice on purpose: the buttons disappear at the
 * limits, and the handlers refuse anyway, since a field array can also be
 * changed from elsewhere.
 */
export default function SingleMultipleChoiceSection({
  control,
  register,
  getValues,
  errors,
}: SingleMultipleChoiceSectionProps) {
  const {
    fields: optionFields,
    append,
    replace,
  } = useFieldArray({ control, name: "options" });

  const addChoice = () => {
    if (optionFields.length >= 5) return;
    append({ text: "", order: optionFields.length });
  };

  const removeChoice = (index: number) => {
    if (optionFields.length <= 2) return;
    const next = getValues("options")
      .filter((_, i) => i !== index)
      .map((option, i) => ({ ...option, order: i }));
    replace(next);
  };

  return (
    <div className="space-y-5 flex flex-col w-full">
      <div className="flex items-center justify-between">
        <CardTitle>Choices</CardTitle>
        <span className="text-sm text-muted-foreground">
          {optionFields.length}/5
        </span>
      </div>
      {optionFields.map((field, index) => (
        <div key={field.id} className="flex gap-2">
          <div className="space-y-2 flex-1">
            <Label>Option {index + 1}</Label>
            <Input
              placeholder={`Option ${index + 1}`}
              {...register(`options.${index}.text` as const)}
            />
            {errors.options?.[index]?.text && (
              <p className="text-sm text-destructive">
                {errors.options[index]?.text?.message}
              </p>
            )}
          </div>
          {optionFields.length > 2 && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="group mt-7"
              onClick={() => removeChoice(index)}
            >
              <HoverIcon
                idle={TrashIcon}
                hover={OpenTrashIcon}
                className="size-4"
              />
            </Button>
          )}
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        className="w-fit"
        disabled={optionFields.length >= 5}
        onClick={addChoice}
      >
        <AddIcon className="mr-2 size-4" />
        Add option
      </Button>
      {errors.options && (
        <p className="text-sm text-destructive">
          {errors.options.root?.message ?? errors.options.message}
        </p>
      )}
    </div>
  );
}
