import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent } from "@/components/ui/card";
import {
  PollCreationSchema,
  type PollCreationDTO,
} from "@shared/schemas/polls.schema";
import { useCreatePoll } from "@/hooks/poll/use-create-poll";
import { toast } from "sonner";
import { ApiError } from "@/lib/fetcher";
import SingleMultiChoiceHeader from "@/components/poll/pollCreation/SectionParts/HeaderSingleMultiChoice";
import SingleMultiChoiceOptions from "@/components/poll/pollCreation/SectionParts/OptionsSingleMultiChoice";
import { defaultValues, type PollFormValues } from "./pollForm";

export default function SingleChoiceSection() {
  const { trigger, isMutating } = useCreatePoll();
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<PollFormValues, unknown, PollCreationDTO>({
    resolver: zodResolver(PollCreationSchema) as Resolver<
      PollFormValues,
      unknown,
      PollCreationDTO
    >,
    defaultValues,
  });

  const onSubmit: SubmitHandler<PollCreationDTO> = async (data) => {
    try {
      await trigger(data);
      toast.success("Poll created");
      reset(defaultValues);
    } catch (err) {
      if (err instanceof ApiError) toast.error(err.message);
      else toast.error("An unknown error occurred");
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <CardHeader className="space-y-4">
        <SingleMultiChoiceHeader
          control={control}
          register={register}
          errors={errors}
        />
      </CardHeader>
      <Separator />
      <CardContent className="grid lg:grid-cols-[3fr_auto_2fr] gap-8">
        <SingleMultiChoiceOptions
          control={control}
          register={register}
          getValues={getValues}
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
