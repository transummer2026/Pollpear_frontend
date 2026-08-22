import { Badge } from "@/components/ui/badge";
import type { PollReadDTO } from "@shared/schemas/polls.schema";

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
