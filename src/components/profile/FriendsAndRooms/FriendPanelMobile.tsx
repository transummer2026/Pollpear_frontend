import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import FriendBadgeLarge from "@/components/profile/FriendsAndRooms/FriendBadgeLarge";
import FriendBadgeMobile from "@/components/profile/FriendsAndRooms/FriendBadgeMobile";
import type { Friend } from "@/components/profile/FriendsAndRooms/friends";
import {
	Popover,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
} from "@/components/ui/popover";

export default function FriendPanelMobile({ friends }: { friends: Friend[] }) {
	return (
		<Card className="w-full">
			<CardHeader className="text-center">
				<CardTitle className="text-lg">PearPals</CardTitle>
			</CardHeader>
			<CardContent className="flex justify-center">
				<Popover>
					<PopoverTrigger asChild>
						<button className="cursor-pointer">
							<FriendBadgeMobile friends={friends} />
						</button>
					</PopoverTrigger>
					<PopoverContent className="w-64 p-0">
						<PopoverHeader className="text-center py-3">
							Friends and Rooms
						</PopoverHeader>
						<ScrollArea className="h-72">
							<ul className="p-2">
								{friends.map((friend) => (
									<FriendBadgeLarge key={friend.id} friend={friend} />
								))}
							</ul>
						</ScrollArea>
					</PopoverContent>
				</Popover>
			</CardContent>
		</Card>
	);
}
