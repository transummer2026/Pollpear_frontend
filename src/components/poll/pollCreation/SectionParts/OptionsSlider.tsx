import { Controller } from "react-hook-form";
import type {
  Control,
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
  FieldErrors,
} from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { CardTitle } from "@/components/ui/card";
import type { PollCreateDTO } from "@shared/schemas/polls.schema";
import {
  type PollFormValues,
  type SliderFormValues,
  INITIAL_DAYS,
  daysFromNow,
  daysUntil,
} from "../pollForm";
import SliderChoiceSection from "@/components/poll/pollCreation/SectionParts/SliderChoiceSection";
import EndsInSetting from "@/components/poll/pollCreation/SectionParts/EndsInSetting";
import AllowVoteChangeSwitch from "@/components/poll/pollCreation/SectionParts/AllowVoteChangeSwitch";
import HashtagsSelection from "@/components/poll/pollCreation/SectionParts/HashtagsSeletion";
import AnonymousSwitch from "@/components/poll/pollCreation/SectionParts/AnonymousSwitch";

type ScaleOptionsProps = {
  control: Control<SliderFormValues, unknown, PollCreateDTO>;
  register: UseFormRegister<SliderFormValues>;
  watch: UseFormWatch<SliderFormValues>;
  setValue: UseFormSetValue<SliderFormValues>;
  errors: FieldErrors<SliderFormValues>;
};

/**
 * Right-hand column of the slider form: everything that is not the scale
 * itself. Identical to its choice-poll counterpart apart from the left
 * section, hence the casts on HashtagsSelection — hashtags are the same field
 * in both unions, but the form types are two distinct branches of it.
 */
export default function OptionsSlider({
  control,
  register,
  watch,
  setValue,
  errors,
}: ScaleOptionsProps) {
  return (
    <>
      <SliderChoiceSection register={register} errors={errors} />
      <Separator orientation="vertical" />
      <div className="space-y-6 flex flex-col w-full">
        <CardTitle>Options</CardTitle>
        <Controller
          control={control}
          name="endsAt"
          render={({ field }) => (
            <EndsInSetting
              days={field.value ? daysUntil(field.value) : INITIAL_DAYS}
              initialDays={INITIAL_DAYS}
              setDays={(days) => field.onChange(daysFromNow(days))}
            />
          )}
        />
        {errors.endsAt && (
          <p className="text-sm text-destructive">{errors.endsAt.message}</p>
        )}
        <Controller
          control={control}
          name="allowChangeVote"
          render={({ field }) => (
            <AllowVoteChangeSwitch
              allowChangeVote={field.value}
              setAllowChangeVote={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="isAnonymous"
          render={({ field }) => (
            <AnonymousSwitch
              anonymous={field.value}
              setAnonymous={field.onChange}
            />
          )}
        />
        <HashtagsSelection
          watch={watch as unknown as UseFormWatch<PollFormValues>}
          setValue={setValue as unknown as UseFormSetValue<PollFormValues>}
        />
      </div>
    </>
  );
}
