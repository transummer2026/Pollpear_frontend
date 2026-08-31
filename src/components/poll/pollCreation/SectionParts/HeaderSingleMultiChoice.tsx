import { Controller } from "react-hook-form";
import type { Control, UseFormRegister, FieldErrors } from "react-hook-form";
import type { PollCreateDTO } from "@shared/schemas/polls.schema";
import TitleSetting from "@/components/poll/pollCreation/SectionParts/TitleSetting";
import PollType from "@/components/poll/pollCreation/SectionParts/PollType";
import PollDescription from "@/components/poll/pollCreation/SectionParts/PollDescription";
import type { PollFormValues } from "@/components/poll/pollCreation/pollForm";

type SingleMultiChoiceHeaderProps = {
  control: Control<PollFormValues, unknown, PollCreateDTO>;
  register: UseFormRegister<PollFormValues>;
  errors: FieldErrors<PollFormValues>;
};

/** Title, type and description of a choice poll — the shared top of both forms. */
export default function SingleMultiChoiceHeader({
  control,
  register,
  errors,
}: SingleMultiChoiceHeaderProps) {
  return (
    <>
      <div className="grid grid-cols-5 gap-6 items-end">
        <TitleSetting
          register={register("title")}
          error={errors.title?.message}
        />
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <PollType type={field.value} setType={field.onChange} />
          )}
        />
      </div>
      <PollDescription
        register={register("description")}
        error={errors.description?.message}
      />
    </>
  );
}
