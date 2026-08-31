import { Badge } from "@/components/ui/badge";
import type { PollReadDTO } from "@shared/schemas/polls.schema";

/**
 * The poll's hashtags. Tags are soft-deleted and the join rows survive them, so
 * the deleted ones are filtered out here rather than shown as ghosts.
 */
export default function PollHashtags({ poll }: { poll: PollReadDTO }) {
  const hashtags = (poll.pollHashtags ?? [])
    .map((pollHashtag) => pollHashtag.hashtag)
    .filter((hashtag) => !hashtag.deletedAt);

  if (hashtags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {hashtags.map((hashtag) => (
        <Badge key={hashtag.id} variant="outline">
          #{hashtag.name}
        </Badge>
      ))}
    </div>
  );
}
