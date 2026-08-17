import { Badge } from "@/components/ui/badge";

export default function HeaderMeHashtags({ hashtags }: { hashtags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {hashtags.map((hashtag) => (
        <Badge key={hashtag} variant="outline">
          {hashtag}
        </Badge>
      ))}
    </div>
  );
}
