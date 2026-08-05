import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent } from "@/components/ui/card";
import {
  PollCreationDTOSchema,
  type PollCreationDTO,
} from "@shared/schemas/polls.schema";
import { useCreatePoll } from "@/hooks/poll/use-create-poll";
import { toast } from "sonner";
import { ApiError } from "@/lib/fetcher";
import ScaleHeader from "@/components/poll/pollCreation/SectionParts/HeaderScale";
import OptionsScale from "@/components/poll/pollCreation/SectionParts/OptionsScale";
import { scaleDefaultValues, type ScaleFormValues } from "./pollForm";

export default function ScaleSection() {
  const { trigger, isMutating } = useCreatePoll();
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ScaleFormValues, unknown, PollCreationDTO>({
    resolver: zodResolver(PollCreationDTOSchema) as Resolver<
      ScaleFormValues,
      unknown,
      PollCreationDTO
    >,
    defaultValues: scaleDefaultValues,
  });

  const onSubmit: SubmitHandler<PollCreationDTO> = async (data) => {
    try {
      await trigger(data);
      toast.success("Poll created");
      reset(scaleDefaultValues);
    } catch (err) {
      if (err instanceof ApiError) toast.error(err.message);
      else toast.error("An unknown error occurred");
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <CardHeader className="space-y-4">
        <ScaleHeader register={register} errors={errors} />
      </CardHeader>
      <Separator />
      <CardContent className="grid lg:grid-cols-[3fr_auto_2fr] gap-8">
        <OptionsScale
          control={control}
          register={register}
          watch={watch}
          setValue={setValue}
          errors={errors}
        />
      </CardContent>
      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={isMutating}>
          Create poll
        </Button>
      </div>
    </form>
  );
}
