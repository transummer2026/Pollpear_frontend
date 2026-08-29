import { Clock3, User, Vote } from "lucide-react";
import { Link } from "react-router";
import {
  differenceInCalendarDays,
  differenceInMinutes,
  formatDistanceToNowStrict,
} from "date-fns";
import type { PollReadDTO } from "@shared/schemas/polls.schema";
import { isPollClosed } from "@/lib/poll";

export default function PollCardFooter({ poll }: { poll: PollReadDTO }) {
  const author = poll.createdBy;
  const totalVotes = poll.voterCount;

  return (
    <div className="border-t pt-4 text-sm text-muted-foreground">
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        <div className="flex items-center gap-2">
          Created {formatCreatedAt(poll.createdAt)}
        </div>

        <div className="flex items-center gap-2">
          <Clock3 size={16} />
          {formatExpiresIn(poll)}
        </div>

        {!poll.isAnonymous && author && (
          <div className="flex items-center gap-2">
            <User size={16} />
            <Link to={`/users/${author.id}`} className="hover:underline">
              {author.username}
            </Link>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Vote size={16} />
          {totalVotes} {totalVotes === 1 ? "vote" : "votes"}
        </div>
      </div>
    </div>
  );
}

/**
 * Sous la journee le jour n'a plus de granularite utile ("Expires in 0 days"),
 * on descend donc a l'heure puis a la minute.
 */
function formatExpiresIn(poll: PollReadDTO) {
  if (isPollClosed(poll)) return "Closed";

  const endsAt = new Date(poll.endsAt);
  const minutesLeft = differenceInMinutes(endsAt, new Date());

  if (minutesLeft < 1) return "Expires in less than a minute";

  const unit =
    minutesLeft >= 60 * 24 ? "day" : minutesLeft >= 60 ? "hour" : "minute";

  return (
    "Expires " +
    formatDistanceToNowStrict(endsAt, {
      unit,
      roundingMethod: "floor",
      addSuffix: true,
    })
  );
}

function formatCreatedAt(createdAt: Date | string) {
  const days = differenceInCalendarDays(new Date(), new Date(createdAt));

  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days > 5) return "5+ days ago";

  return `${days} days ago`;
}
