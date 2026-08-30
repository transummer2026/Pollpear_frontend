import DemoMultipleChoicePoll from "@/components/home/Section/DemoMultipleChoicePoll";
import DemoSingleChoicePoll from "@/components/home/Section/DemoSingleChoicePoll";
import DemoSliderPoll from "@/components/home/Section/DemoSliderPoll";
import { BRAND } from "@/components/home/Section/brand";

export default function PollTypesSection() {
  return (
    <section className={`px-6 py-12 ${BRAND.sectionBorder}`}>
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="max-w-2xl space-y-2">
          <h2 className="font-heading text-2xl md:text-3xl font-bold">
            Three ways to ask
          </h2>
          <p className="text-muted-foreground">
            Single choice, multiple choice or a slider when the answer is a
            feeling rather than an option. Results appear as soon as you vote,
            and you can change your mind until the deadline.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 items-start">
          <DemoSingleChoicePoll />
          <DemoMultipleChoicePoll />
          <DemoSliderPoll />
        </div>
      </div>
    </section>
  );
}
