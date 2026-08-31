import { Badge } from "@/components/ui/badge";

/** same badge as PollHashtags, so the landing demos read as real poll cards */
export default function DemoHashtags({ hashtags }: { hashtags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {hashtags.map((hashtag) => (
        <Badge key={hashtag} variant="outline">
          #{hashtag}
        </Badge>
      ))}
    </div>
  );
}
