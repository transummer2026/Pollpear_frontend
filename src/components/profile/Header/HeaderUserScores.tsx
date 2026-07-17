import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@/components/ui/item"

export default function HeaderUserScores({ scores }: { scores: any }) {  
  return (
    <ItemGroup className="grid grid-cols-4 gap-4">
      <Item variant="outline" size="sm"> 
        <ItemContent>
          <ItemTitle className="text-lg font-bold">{scores.scores}</ItemTitle>
          <ItemDescription>
            score
          </ItemDescription>
        </ItemContent>
      </Item>

      <Item variant="outline" size="sm"> 
        <ItemContent>
          <ItemTitle className="text-lg font-bold">{scores.friends}</ItemTitle>
          <ItemDescription>
            PearsPals
          </ItemDescription>
        </ItemContent>
      </Item>

      <Item variant="outline" size="sm"> 
        <ItemContent>
          <ItemTitle className="text-lg font-bold">{scores.rooms}</ItemTitle>
          <ItemDescription>
            Active Rooms
          </ItemDescription>
        </ItemContent>
      </Item>

      <Item variant="outline" size="sm"> 
        <ItemContent>
          <ItemTitle className="text-lg font-bold">{scores.pollsCreated}</ItemTitle>
          <ItemDescription>
            Polls Created
          </ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  )
}