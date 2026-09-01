import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { ApiError } from "@/lib/fetcher";
import { useVotePoll } from "@/hooks/poll/use-poll";
import { pollKeys } from "@/lib/revalidate";
import { type PollVoteProps } from "@/components/poll/pollVote/PollVoteCard";
import PollHashtags from "@/components/poll/PollHashtags";
import PollCardHeader from "@/components/poll/PollCardHeader";
import PollCardFooter from "@/components/poll/PollCardFooter";
import {
  SCALE_MAX,
  SCALE_MIN,
  getSliderLabels,
  getVisibleOptions,
} from "@/lib/poll";

// Starts in the middle, so the handle's position never suggests an answer, and
// moves in steps of 5: the exact percentage is noise on an opinion scale.
const SCALE_START = 50;
const SCALE_STEP = 5;

/**
 * Slider ballot. The answer travels in `freeField` as a string, the option
 * itself being the scale rather than a choice — a slider poll has exactly one.
 */
export default function PollVoteSlider({
  poll,
  roomId,
  onShowResults,
}: PollVoteProps) {
  const { leftLabel, rightLabel } = getSliderLabels(poll);
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useVotePoll(poll.id);

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
      if (roomId) await mutate(`/rooms/${roomId}`);
      await mutate(pollKeys);
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
      <PollCardHeader poll={poll} onToggleResults={onShowResults} />

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

      <Button
        type="button"
        className="w-full bg-[#3A4336] text-white hover:bg-[#3A4336]/80"
        disabled={isMutating || !sliderOption}
        onClick={handleVote}
      >
        Submit vote
      </Button>

      <PollHashtags poll={poll} />

      <PollCardFooter poll={poll} />
    </Card>
  );
}
