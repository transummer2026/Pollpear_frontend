import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent } from "@/components/ui/card";
import {
  PollCreateSchema,
  type PollCreateDTO,
} from "@shared/schemas/polls.schema";
import { usePollCreate } from "@/hooks/poll/use-poll";
import { toast } from "sonner";
import { ApiError } from "@/lib/fetcher";
import SingleMultiChoiceHeader from "@/components/poll/pollCreation/SectionParts/HeaderSingleMultiChoice";
import SingleMultiChoiceOptions from "@/components/poll/pollCreation/SectionParts/OptionsSingleMultiChoice";
import { defaultValues, type PollFormValues } from "./pollForm";
import { useSWRConfig } from "swr";
import { useNavigate } from "react-router";

export default function SingleChoiceSection() {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = usePollCreate();
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<PollFormValues, unknown, PollCreateDTO>({
    resolver: zodResolver(PollCreateSchema) as Resolver<
      PollFormValues,
      unknown,
      PollCreateDTO
    >,
    defaultValues,
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<PollCreateDTO> = async (data) => {
    try {
      const updated = await trigger(data);
      await mutate("/poll/{id}", updated, { revalidate: false });
      toast.success("Poll created");
      reset(defaultValues);
      navigate("/me", { replace: true });
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
