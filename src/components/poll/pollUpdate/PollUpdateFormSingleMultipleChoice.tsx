import {
  useForm,
  Controller,
  type Control,
  type Resolver,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSWRConfig } from "swr";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { ApiError } from "@/lib/fetcher";
import {
  PollUpdateSchema,
  type PollCreateDTO,
  type PollUpdateDTO,
} from "@shared/schemas/polls.schema";
import { usePollUpdate } from "@/hooks/poll/use-poll";
import type { PollReadDTO } from "@shared/schemas/polls.schema";
import TitleSetting from "@/components/poll/pollCreation/SectionParts/TitleSetting";
import EndsInSetting from "@/components/poll/pollCreation/SectionParts/EndsInSetting";
import PollDescription from "@/components/poll/pollCreation/SectionParts/PollDescription";
import AnonymousSwitch from "@/components/poll/pollCreation/SectionParts/AnonymousSwitch";
import HashtagsSelection from "@/components/poll/pollCreation/SectionParts/HashtagsSeletion";
import AllowVoteChangeSwitch from "@/components/poll/pollCreation/SectionParts/AllowVoteChangeSwitch";
import SingleMultipleChoiceSection from "@/components/poll/pollCreation/SectionParts/SingleMulitpleChoiceSection";
import {
  INITIAL_DAYS,
  daysFromNow,
  daysUntil,
  type PollFormValues,
} from "@/components/poll/pollCreation/pollForm";
import { getVisibleOptions } from "@/lib/poll";

type PollUpdateFormSingleMultipleChoiceProps = {
  poll: PollReadDTO;
  onCancel?: () => void;
  onUpdated?: () => void;
};

type OptionFormValue = PollFormValues["options"][number] & { id?: number };

type ChoicePollUpdateDTO = Extract<
  PollUpdateDTO,
  { type: "single_choice" | "multiple_choice" }
>;

function toFormValues(poll: PollReadDTO): PollFormValues {
  const options: OptionFormValue[] = getVisibleOptions(poll).map((option) => ({
    id: option.id,
    text: option.text,
    order: option.order,
  }));

  return {
    type: poll.type === "multiple_choice" ? "multiple_choice" : "single_choice",
    title: poll.title,
    description: poll.description ?? "",
    endsAt: daysFromNow(daysUntil(new Date(poll.endsAt))),
    isAnonymous: poll.isAnonymous,
    allowChangeVote: poll.allowChangeVote,
    options,
    hashtags: poll.pollHashtags.map((pollHashtag) => ({
      name: pollHashtag.hashtag.name,
    })),
  };
}

function hasChanged(dirty: unknown): boolean {
  if (Array.isArray(dirty)) return dirty.some(hasChanged);
  if (typeof dirty === "object" && dirty !== null)
    return Object.values(dirty).some(hasChanged);
  return Boolean(dirty);
}

export default function PollUpdateFormSingleMultipleChoice({
  poll,
  onCancel,
  onUpdated,
}: PollUpdateFormSingleMultipleChoiceProps) {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = usePollUpdate(poll.id);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, dirtyFields },
  } = useForm<PollFormValues, unknown, PollUpdateDTO>({
    resolver: zodResolver(PollUpdateSchema) as unknown as Resolver<
      PollFormValues,
      unknown,
      PollUpdateDTO
    >,
    defaultValues: toFormValues(poll),
  });

  const onSubmit: SubmitHandler<PollUpdateDTO> = async (submitted) => {
    const data = submitted as ChoicePollUpdateDTO;
    const changes: Omit<ChoicePollUpdateDTO, "type"> = {};

    if (hasChanged(dirtyFields.title)) changes.title = data.title;
    if (hasChanged(dirtyFields.description))
      changes.description = data.description ?? null;
    if (hasChanged(dirtyFields.endsAt)) changes.endsAt = data.endsAt;
    if (hasChanged(dirtyFields.isAnonymous))
      changes.isAnonymous = data.isAnonymous;
    if (hasChanged(dirtyFields.allowChangeVote))
      changes.allowChangeVote = data.allowChangeVote;
    if (hasChanged(dirtyFields.hashtags))
      changes.hashtags = data.hashtags ?? [];
    if (hasChanged(dirtyFields.options) && data.options) {
      changes.options = data.options.map((option, index) => ({
        ...option,
        order: index,
      }));
    }

    if (Object.keys(changes).length === 0) {
      onUpdated?.();
      return;
    }

    const payload = { type: data.type, ...changes } as PollUpdateDTO;

    try {
      await trigger(payload);
      await mutate(
        (key) => typeof key === "string" && key.startsWith("/polls"),
      );
      toast.success("Poll updated");
      onUpdated?.();
    } catch (err) {
      if (err instanceof ApiError) toast.error(err.message);
      else toast.error("An unknown error occurred");
    }
  };

  return (
    <form className="min-w-0 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <TitleSetting
          register={register("title")}
          error={errors.title?.message}
        />
        <PollDescription
          register={register("description")}
          error={errors.description?.message}
        />
      </div>

      <Separator />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_auto_minmax(0,2fr)]">
        <SingleMultipleChoiceSection
          control={
            control as unknown as Control<
              PollFormValues,
              unknown,
              PollCreateDTO
            >
          }
          register={register}
          getValues={getValues}
          errors={errors}
        />

        <Separator orientation="vertical" className="hidden lg:block" />

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
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isMutating}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isMutating}>
          Save changes
        </Button>
      </div>
    </form>
  );
}
