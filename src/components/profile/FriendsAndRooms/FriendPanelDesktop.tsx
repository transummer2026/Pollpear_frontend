import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FriendBadgeLarge from "@/components/profile/FriendsAndRooms/FriendBadgeLarge";
import type { Friend } from "@/components/profile/FriendsAndRooms/friends";

export default function FriendPanelDesktop({ friends }: { friends: Friend[] }) {
	const [showAll, setShowAll] = useState(false);
	const visibleFriends = showAll ? friends : friends.slice(0, 4);

	return (
		<Card>
			<CardHeader className="text-center">
				<CardTitle className="text-lg">PearPals</CardTitle>
			</CardHeader>
			<ul>
				{visibleFriends.map((friend) => (
					<FriendBadgeLarge key={friend.id} friend={friend} />
				))}
				{friends.length > 4 && (
					<Button
						variant="ghost"
						className="flex p-2 m-1 border-b border-gray-200"
						onClick={() => setShowAll((prev) => !prev)}
					>
						{showAll ? "see less .." : "see more .."}
					</Button>
				)}
			</ul>
			<CardHeader className="text-center">
				<CardTitle className="text-lg">Rooms</CardTitle>
			</CardHeader>
		</Card>
	);
}
