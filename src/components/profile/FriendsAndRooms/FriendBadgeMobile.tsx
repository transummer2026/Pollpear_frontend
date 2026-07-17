import { PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/components/ui/avatar";
import avatar from "@/assets/pwar.jpg";

export default function FriendBadge() {
  return (
    <PopoverTrigger asChild>
      <button>
        <AvatarGroup className="cursor-pointer">
          <Avatar>
            <AvatarImage
              src={avatar}
              alt="friend avatar"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src={avatar}
              alt="friend avatar"
            />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src={avatar}
              alt="friend avatar"
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>

          <AvatarGroupCount>
            +3
          </AvatarGroupCount>
        </AvatarGroup>
      </button>
    </PopoverTrigger>
  );
}