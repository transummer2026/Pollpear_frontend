import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
} from "@/components/ui/item";

type HeaderUserScoreProps = {
  value: number;
  label: string;
};

export default function HeaderUserScore({
  value,
  label,
}: HeaderUserScoreProps) {
  return (
    <Item variant="outline" size="sm">
      <ItemContent>
        <ItemTitle className="text-lg font-bold">{value === undefined ? "0" : value}</ItemTitle>

        <ItemDescription>{label}</ItemDescription>
      </ItemContent>
    </Item>
  );
}
