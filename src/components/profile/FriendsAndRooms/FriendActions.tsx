import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Trash, User } from "lucide-react";

export default function FriendActions({ friendId }: { friendId: number }) {
	return (
		<div>
			<Link to={`/user/${friendId}`}>
				<Badge variant="secondary" className="cursor-pointer">
					<User />
				</Badge>
			</Link>
			<Badge variant="destructive" className="cursor-pointer">
				<Trash />
			</Badge>
		</div>
	);
}
