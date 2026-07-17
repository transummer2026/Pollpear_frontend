import { Item, ItemTitle } from "@/components/ui/item";
import {
	Avatar,
	AvatarBadge,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar"
import avatar from "@/assets/pwar.jpg";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Trash, User } from "lucide-react"

// TODO: mettre le id pour le lien du friend 

export default function FriendBage({ friends}:  {friends: any}) {
	const isOnline = friends.status === "online";

	return (
<Item className="flex items-center justify-between p-2 m-1 border-b border-gray-200">
	<div className="flex items-center">
		<Link to={`/user/${friends.id}`}>
			<Avatar>
				<AvatarImage src={avatar} alt="friend avatar" />
				<AvatarFallback>FA</AvatarFallback>
				<AvatarBadge
					className={
						isOnline
							? "bg-green-600 dark:bg-green-800"
							: "bg-gray-400 dark:bg-gray-600"
					}
				/>
			</Avatar>
		</Link>

		<ItemTitle className="ml-4">{friends.name}</ItemTitle>
	</div>
	<div>
		<Link to={`/user/${friends.id}`}>
			<Badge variant="secondary" className="cursor-pointer">
				<User/>
			</Badge>
		</Link>
			<Badge variant="destructive" className="cursor-pointer">
				<Trash/>
			</Badge>
	</div>
</Item>
	)
}