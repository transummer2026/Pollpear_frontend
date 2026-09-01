import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { ApiError } from "@/lib/fetcher";
import { useVotePollUpdate } from "@/hooks/poll/use-poll";
import { pollKeys } from "@/lib/revalidate";
import { type PollUpdateVoteProps } from "@/components/poll/pollVoteUpdate/PollUpdateVoteCard";
import PollHashtags from "@/components/poll/PollHashtags";
import PollCardHeader from "@/components/poll/PollCardHeader";
import PollCardFooter from "@/components/poll/PollCardFooter";
import {
  SCALE_MAX,
  SCALE_MIN,
  getSliderLabels,
  getVisibleOptions,
} from "@/lib/poll";

const SCALE_START = 50;
const SCALE_STEP = 5;

/** Re-vote on a slider poll: the handle starts back at the middle, not on the previous answer. */
export default function PollUpdateVoteSlider({
  poll,
  onDone,
}: PollUpdateVoteProps) {
  const { leftLabel, rightLabel } = getSliderLabels(poll);
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useVotePollUpdate(poll.id);

  const [value, setValue] = useState<number>(SCALE_START);
  const sliderOption = getVisibleOptions(poll)[0];

  const handleVote = async () => {
    if (!sliderOption) return;

    try {
      await trigger({
        type: "slider",
        optionsVoted: [{ optionId: sliderOption.id }],
        freeField: String(value),
      });
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

      <div className="space-y-6 py-4">
        <div className="text-center text-2xl font-bold">{value}%</div>

        <div className="space-y-2">
          <Slider
            value={[value]}
            min={SCALE_MIN}
            max={SCALE_MAX}
            step={SCALE_STEP}
            disabled={isMutating}
            onValueChange={(values) => setValue(values[0])}
            className="poll-bar-slider"
          />

          <div className="flex justify-between gap-4 text-sm text-muted-foreground">
            <span className="max-w-[45%] text-left">{leftLabel}</span>
            <span className="max-w-[45%] text-right">{rightLabel}</span>
          </div>
        </div>
      </div>

      <div className="flex w-full gap-2 px-2">
        <Button
          type="button"
          size="sm"
          className="flex-1 bg-[#3A4336] text-white hover:bg-[#3A4336]/80"
          disabled={isMutating || !sliderOption}
          onClick={handleVote}
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

      <PollHashtags poll={poll} />

      <PollCardFooter poll={poll} />
    </Card>
  );
}
