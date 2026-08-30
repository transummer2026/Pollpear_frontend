import { Badge } from "@/components/ui/badge";
import { BRAND } from "@/components/home/Section/brand";

export default function DemoHashtags({ hashtags }: { hashtags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {hashtags.map((hashtag) => (
        <Badge key={hashtag} variant="outline" className={BRAND.hashtagBadge}>
          #{hashtag}
        </Badge>
      ))}
    </div>
  );
}
