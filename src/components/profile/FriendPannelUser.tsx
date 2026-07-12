import { Popover, PopoverContent, PopoverHeader, PopoverTrigger } from "@/components/ui/popover";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import FriendBage from "@/components/profile/FriendBage";
import avatar from "@/assets/pwar.jpg";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";

export default function FriendPannelUser() {
	return (
    <>
      <div className="hidden lg:block">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Friends and Rooms</CardTitle>
          </CardHeader>
          <ul>
            <FriendBage />
            <FriendBage />
            <FriendBage />
          </ul>
        </Card>
      </div>
      <div className="flex justify-center lg:hidden">
        <Popover>
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

          <PopoverContent className="w-64">
            <div className="space-y-3">
              <PopoverHeader className="text-center">
                Friends and Rooms
              </PopoverHeader>
              <ul>
                <FriendBage />
                <FriendBage />
                <FriendBage />
              </ul>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}