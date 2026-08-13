import { Controller } from "react-hook-form";
import type {
  Control,
  UseFormRegister,
  UseFormGetValues,
  UseFormWatch,
  UseFormSetValue,
  FieldErrors,
} from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { CardTitle } from "@/components/ui/card";
import type { PollCreateDTO } from "@shared/schemas/polls.schema";
import {
  type PollFormValues,
  INITIAL_DAYS,
  daysFromNow,
  daysUntil,
} from "../pollForm";
import SingleMultipleChoiceSection from "@/components/poll/pollCreation/SectionParts/SingleMulitpleChoiceSection";
import EndsInSetting from "@/components/poll/pollCreation/SectionParts/EndsInSetting";
import AllowVoteChangeSwitch from "@/components/poll/pollCreation/SectionParts/AllowVoteChangeSwitch";
import HashtagsSelection from "@/components/poll/pollCreation/SectionParts/HashtagsSeletion";
import AnonymousSwitch from "@/components/poll/pollCreation/SectionParts/AnonymousSwitch";

type SingleMultiChoiceOptionsProps = {
  control: Control<PollFormValues, unknown, PollCreateDTO>;
  register: UseFormRegister<PollFormValues>;
  getValues: UseFormGetValues<PollFormValues>;
  watch: UseFormWatch<PollFormValues>;
  setValue: UseFormSetValue<PollFormValues>;
  errors: FieldErrors<PollFormValues>;
};

export default function SingleMultiChoiceOptions({
  control,
  register,
  getValues,
  watch,
  setValue,
  errors,
}: SingleMultiChoiceOptionsProps) {
  return (
    <>
      <SingleMultipleChoiceSection
        control={control}
        register={register}
        getValues={getValues}
        errors={errors}
      />
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
        <HashtagsSelection watch={watch} setValue={setValue} />
      </div>
    </>
  );
}
