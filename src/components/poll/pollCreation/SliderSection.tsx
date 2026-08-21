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
import ScaleHeader from "@/components/poll/pollCreation/SectionParts/HeaderSlider";
import OptionsScale from "@/components/poll/pollCreation/SectionParts/OptionsSlider";
import { scaleDefaultValues, type SliderFormValues } from "./pollForm";
import { useSWRConfig } from "swr";
import { useNavigate } from "react-router";

export default function SliderSection() {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = usePollCreate();
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SliderFormValues, unknown, PollCreateDTO>({
    resolver: zodResolver(PollCreateSchema) as Resolver<
      SliderFormValues,
      unknown,
      PollCreateDTO
    >,
    defaultValues: scaleDefaultValues,
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<PollCreateDTO> = async (data) => {
    console.log(data);
    try {
      const updated = await trigger(data);
      await mutate("/poll/{id}", updated, { revalidate: false });
      toast.success("Poll created");
      reset(scaleDefaultValues);
      navigate("/me", { replace: true });
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
