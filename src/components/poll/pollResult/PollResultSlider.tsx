import { Card } from "@/components/ui/card";
import { type PollResultProps } from "@/components/poll/pollResult/PollResultCard";
import PollHashtags from "@/components/poll/PollHashtags";
import PollCardHeader from "@/components/poll/PollCardHeader";
import PollUpdateVoteButton from "@/components/poll/pollResult/PollUpdateVoteButton";
import PollCardFooter from "@/components/poll/PollCardFooter";
import { getSliderLabels } from "@/lib/poll";
import { Slider } from "@/components/ui/slider";

/**
 * Result of a slider poll: the average answer, on the same scale the voters
 * used. The backend returns it as a 0–1 ratio while votes are cast from 0 to
 * 100, hence the conversion. The slider is disabled — it is a reading, not an
 * input.
 */
export default function PollResultSlider({
  poll,
  onUpdateVote,
  onBackToVote,
}: PollResultProps) {
  const { leftLabel, rightLabel } = getSliderLabels(poll);
  const result = Math.round(poll.sliderResult * 100);
  return (
    <Card size="sm" className="mx-auto p-4 space-y-4 poll-card-sunken ring-0">
      <PollCardHeader
        poll={poll}
        onToggleResults={onBackToVote}
        showingResults
      />
      <h2 className="text-base font-bold">{poll.title}</h2>

      {poll.description && (
        <p className="text-base text-muted-foreground wrap-anywhere">
          {poll.description}
        </p>
      )}
      <div className="text-center space-y-6 py-4">
        <div className="text-center text-2xl font-bold">{result}%</div>
        <div className="space-y-2">
          <Slider
            defaultValue={[result]}
            max={100}
            step={5}
            disabled
            className="mx-auto w-full max-w-xs poll-bar-slider"
          />
          <div className="flex justify-between gap-4 text-sm text-muted-foreground">
            <span className="max-w-[45%] text-left">{leftLabel}</span>
            <span className="max-w-[45%] text-right">{rightLabel}</span>
          </div>
        </div>
      </div>

      <PollUpdateVoteButton poll={poll} onUpdateVote={onUpdateVote} />

      <PollHashtags poll={poll} />

      <PollCardFooter poll={poll} />
    </Card>
  );
}
