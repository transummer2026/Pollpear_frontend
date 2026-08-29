import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";

type HeaderUserScoreProps = {
  label: string;
  value?: number;
  className?: string;
};

export default function HeaderUserScore({
  value,
  label,
  className,
}: HeaderUserScoreProps) {
  return (
    <Item
      variant="outline"
      size="sm"
      className={cn("border-transparent", className)}
    >
      <ItemContent>
        <ItemTitle className="text-lg font-bold">
          {value === undefined ? "0" : value}
        </ItemTitle>

        <ItemDescription className="text-current">{label}</ItemDescription>
      </ItemContent>
    </Item>
  );
}
