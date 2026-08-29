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
      size="xs"
      className={cn("border-transparent", className)}
    >
      <ItemContent>
        <ItemTitle className="text-base font-bold">
          {value === undefined ? "0" : value}
        </ItemTitle>

        <ItemDescription className="text-xs text-current">
          {label}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
}
