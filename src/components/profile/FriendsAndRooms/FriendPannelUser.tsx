import { Popover, PopoverContent, PopoverHeader } from "@/components/ui/popover";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import FriendBadge from "@/components/profile/FriendsAndRooms/FriendBadgeLarge";

import FriendBadgeMobile from "./FriendBadgeMobile";
import { Button } from "@/components/ui/button";


const user = {
  friends: [
    { name: "Benedicte", status: "online", id: 40},
    { name: "José", status: "online", id: 41 },
    { name: "Miguel", status: "offline", id: 42 },
    { name: "Rafffffffffffffffffffffffffffael", status: "offline", id: 43}
  ],
};

export default function FriendPannelUser() {
	return (
		<>
			<div className="hidden lg:block">
				<Card>
					<CardHeader className="text-center">
						<CardTitle className="text-lg">PearPals</CardTitle>
					</CardHeader>
					<ul>
						<FriendBadge friends={user.friends[0]} />
						<FriendBadge friends={user.friends[1]} />
						<FriendBadge friends={user.friends[2]} />
            <FriendBadge friends={user.friends[3]} />
						<Button variant= "ghost" className="flex p-2 m-1 border-b border-gray-200"> see more ..</Button>
					</ul>

					<CardHeader className="text-center">
						<CardTitle className="text-lg">Rooms</CardTitle>
					</CardHeader>

				</Card>
			</div>


			<div className="flex justify-center lg:hidden">
				<Popover>
					<FriendBadgeMobile />
					<PopoverContent className="w-64">
						<div className="space-y-3">
							<PopoverHeader className="text-center">
								Friends and Rooms
							</PopoverHeader>
							<ul>
								<FriendBadge friends={user.friends[0]} />
						    <FriendBadge friends={user.friends[1]} />
						    <FriendBadge friends={user.friends[2]} />
                <FriendBadge friends={user.friends[3]} />
							</ul>
						</div>
					</PopoverContent>
				</Popover>
			</div>
		</>
	)
}