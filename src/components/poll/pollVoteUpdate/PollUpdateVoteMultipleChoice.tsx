import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSWRConfig } from "swr";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ApiError } from "@/lib/fetcher";
import {
  VoteCreateSchema,
  type VoteCreateDTO,
} from "@shared/schemas/vote.schema";
import { useVotePollUpdate } from "@/hooks/poll/use-poll";
import { pollKeys } from "@/lib/revalidate";
import { type PollUpdateVoteProps } from "@/components/poll/pollVoteUpdate/PollUpdateVoteCard";
import PollHashtags from "@/components/poll/PollHashtags";
import PollCardHeader from "@/components/poll/PollCardHeader";
import PollCardFooter from "@/components/poll/PollCardFooter";
import { Check } from "lucide-react";
import { getVisibleOptions } from "@/lib/poll";

/**
 * Re-vote on a multiple-choice poll. The selection replaces the previous one
 * wholesale — the options submitted are the vote, not a delta on it.
 */
export default function PollUpdateVoteMultipleChoice({
  poll,
  onDone,
}: PollUpdateVoteProps) {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useVotePollUpdate(poll.id);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VoteCreateDTO>({
    resolver: zodResolver(VoteCreateSchema),
    defaultValues: { type: "multiple_choice", optionsVoted: [] },
  });

  const optionsVoted = useWatch({ control, name: "optionsVoted" }) ?? [];

  const toggleAnswer = (optionId: number) => {
    const selected = optionsVoted.some(
      (option) => option.optionId === optionId,
    );

    setValue(
      "optionsVoted",
      selected
        ? optionsVoted.filter((option) => option.optionId !== optionId)
        : [...optionsVoted, { optionId }],
      { shouldValidate: true },
    );
  };

  const onSubmit: SubmitHandler<VoteCreateDTO> = async (data) => {
    try {
      await trigger(data);
      await mutate(pollKeys);
      toast.success("Vote recorded");
      onDone();
    } catch (err) {
      if (err instanceof ApiError) toast.error(err.message);
      else toast.error("An unknown error occurred");
    }
  };

  return (
    <Card size="sm" className="w-full self-start p-4 space-y-4">
      <PollCardHeader poll={poll} />

      <h2 className="text-base font-bold">{poll.title}</h2>

      {poll.description && (
        <p className="text-base text-muted-foreground wrap-anywhere">
          {poll.description}
        </p>
      )}

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          {getVisibleOptions(poll).map((option) => {
            const selected = optionsVoted.some(
              (voted) => voted.optionId === option.id,
            );

            return (
              <Button
                key={option.id}
                type="button"
                variant={selected ? "default" : "outline"}
                className={cn(
                  "w-full justify-between h-12",
                  selected && "bg-[#6F8459] text-white hover:bg-[#6F8459]/90",
                  !selected && "hover:bg-muted",
                )}
                aria-pressed={selected}
                disabled={isMutating}
                onClick={() => toggleAnswer(option.id)}
              >
                <span>{option.text}</span>

                {selected && <Check size={18} />}
              </Button>
            );
          })}
        </div>

        {errors.optionsVoted && (
          <p className="text-sm text-destructive">
            {errors.optionsVoted.message}
          </p>
        )}

        <div className="flex w-full gap-2 px-2">
          <Button
            type="submit"
            size="sm"
            className="flex-1 bg-[#3A4336] text-white hover:bg-[#3A4336]/80"
            disabled={isMutating}
          >
            Update my vote
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="flex-1 text-muted-foreground"
            disabled={isMutating}
            onClick={onDone}
          >
            Cancel
          </Button>
        </div>
      </form>

      <PollHashtags poll={poll} />

      <PollCardFooter poll={poll} />
    </Card>
  );
}
