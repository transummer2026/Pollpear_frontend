import avatar from "@/assets/pwar.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarUser() {
  return (
    <Avatar className="h-40 w-40 rounded-full object-cover cursor-pointer border-2">
      <AvatarImage src={avatar} alt="friend avatar" />
      <AvatarFallback>FA</AvatarFallback>
    </Avatar>
  );
}
