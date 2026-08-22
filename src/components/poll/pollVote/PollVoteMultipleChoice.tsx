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
import { useVotePoll } from "@/hooks/poll/use-poll";
import type { PollReadDTO } from "@shared/schemas/polls.schema";
import PollHashtags from "@/components/poll/PollHashtags";
import PollCardHeader from "@/components/poll/PollCardHeader";
import PollCardFooter from "@/components/poll/PollCardFooter";
import { Check } from "lucide-react";
import { getVisibleOptions } from "@/lib/poll";

export default function PollVoteMultipleChoice({
  poll,
}: {
  poll: PollReadDTO;
}) {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useVotePoll(poll.id);
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
      await mutate(`/polls/${poll.id}`);
      await mutate(`/polls`);
      toast.success("Vote recorded");
    } catch (err) {
      if (err instanceof ApiError) toast.error(err.message);
      else toast.error("An unknown error occurred");
    }
  };

  return (
    <Card
      size="sm"
      className="w-full self-start p-4 space-y-4 poll-card-raised ring-0"
    >
      <PollCardHeader poll={poll} />

      <h2 className="text-sm font-bold">{poll.title}</h2>

      {poll.description && (
        <p className="text-sm text-muted-foreground">{poll.description}</p>
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

        <Button type="submit" className="w-full" disabled={isMutating}>
          Submit vote
        </Button>
      </form>

      <PollHashtags poll={poll} />

      <PollCardFooter poll={poll} />
    </Card>
  );
}
