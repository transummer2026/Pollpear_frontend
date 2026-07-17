import { Badge } from "@/components/ui/badge";

export default function HeaderUserHashtags({ hashtags }: { hashtags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline">{hashtags[0]}</Badge>
      <Badge variant="outline">{hashtags[1]}</Badge>
      <Badge variant="outline">{hashtags[2]}</Badge>
      <Badge variant="outline">{hashtags[3]}</Badge>
      <Badge variant="outline">{hashtags[4]}</Badge>
      <Badge variant="outline">{hashtags[5]}</Badge>
    </div>
  );
}
