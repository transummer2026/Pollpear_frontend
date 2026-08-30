import type { ReactNode } from "react";
import PollCard from "@/components/poll/PollCard";
import { useColumnCount } from "@/hooks/use-column-count";
import type { PollReadDTO } from "@shared/schemas/polls.schema";

type PollColumnsProps = {
  polls: PollReadDTO[];
  roomId?: number;
  /** Rendered at the top of the first column, before any poll. */
  leadingCard?: ReactNode;
};

/**
 * Splits `items` into `columnCount` columns of near-equal length, filled in
 * order: 7 items over 3 columns give [1,2,3], [4,5], [6,7]. The extra items of
 * an uneven split go to the leftmost columns.
 */
function splitIntoColumns<T>(items: T[], columnCount: number): T[][] {
  const baseSize = Math.floor(items.length / columnCount);
  const remainder = items.length % columnCount;
  const columns: T[][] = [];
  let start = 0;

  for (let column = 0; column < columnCount; column++) {
    const size = baseSize + (column < remainder ? 1 : 0);
    columns.push(items.slice(start, start + size));
    start += size;
  }

  return columns;
}

/**
 * Poll grid in 1 to 3 columns depending on the viewport.
 *
 * Replaces a CSS multi-column layout: that one balances columns by *height*,
 * so a card growing when its results show up moved the break points and
 * visually reshuffled the other polls. Splitting by count keeps every poll at
 * a fixed position whatever the cards measure.
 */
export default function PollColumns({
  polls,
  roomId,
  leadingCard,
}: PollColumnsProps) {
  const columnCount = useColumnCount();
  const columns = splitIntoColumns(polls, columnCount);

  return (
    <div className="flex items-start gap-5">
      {columns.map((column, index) => (
        <div key={index} className="flex min-w-0 flex-1 flex-col gap-5">
          {index === 0 && leadingCard}
          {column.map((poll) => (
            <PollCard key={poll.id} poll={poll} roomId={roomId} />
          ))}
        </div>
      ))}
    </div>
  );
}
