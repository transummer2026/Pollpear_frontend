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
import { Input } from "@/components/ui/input";

type RoomProps = {
  roomId?: number;
};

/**
 * The choice-poll creation form, single and multiple alike — the two differ
 * only by the `type` field, which the header lets the author flip.
 *
 * `roomId` rides along as a hidden field when the poll is being created from
 * inside a room, and decides where the author lands afterwards: back to the
 * room, or to their own profile.
 */
export default function SingleChoiceSection({ roomId }: RoomProps) {
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
      navigate(roomId ? `/rooms/${roomId}` : "/me", { replace: true });
    } catch (err) {
      if (err instanceof ApiError) toast.error(err.message);
      else toast.error("An unknown error occurred");
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      {roomId !== undefined && (
        <Input
          type="hidden"
          defaultValue={roomId}
          {...register("roomId", { valueAsNumber: true })}
        />
      )}
      <CardHeader className="space-y-4">
        <SingleMultiChoiceHeader
          control={control}
          register={register}
          errors={errors}
        />
      </CardHeader>
      <Separator />
      <CardContent className="grid lg:grid-cols-[minmax(0,3fr)_auto_minmax(0,2fr)] gap-8">
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
        <Button
          type="submit"
          size="lg"
          className="bg-[#325024] text-white hover:bg-[#325024]/90"
          disabled={isMutating}
        >
          Create poll
        </Button>
      </div>
    </form>
  );
}
