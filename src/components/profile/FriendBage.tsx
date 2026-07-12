import { Item, ItemTitle } from "@/components/ui/item";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import avatar from "@/assets/pwar.jpg";

export default function FriendBage() {
  return (
    <Item className="flex  p-2 border-b border-gray-200">
      <Avatar>
        <AvatarImage src={avatar} alt="friend avatar" />
        <AvatarFallback>CN</AvatarFallback>
        <AvatarBadge className="bg-green-600 dark:bg-green-800" />
      </Avatar>
      <ItemTitle className="ml-4">Friend Name</ItemTitle>
    </Item>
  )
}