import type { UseFormRegister, FieldErrors } from "react-hook-form";
import TitleSetting from "@/components/poll/pollCreation/SectionParts/TitleSetting";
import PollDescription from "@/components/poll/pollCreation/SectionParts/PollDescription";
import type { ScaleFormValues } from "@/components/poll/pollCreation/pollForm";

type ScaleHeaderProps = {
  register: UseFormRegister<ScaleFormValues>;
  errors: FieldErrors<ScaleFormValues>;
};

/** No poll type picker here: the type is already fixed by the "Scale" tab. */
export default function ScaleHeader({ register, errors }: ScaleHeaderProps) {
  return (
    <>
      <div className="grid grid-cols-5 gap-6 items-end">
        <TitleSetting
          register={register("title")}
          error={errors.title?.message}
        />
      </div>
      <PollDescription
        register={register("description")}
        error={errors.description?.message}
      />
    </>
  );
}
