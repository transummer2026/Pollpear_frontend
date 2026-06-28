import { Input } from "@/components/ui/input"
import { Menu } from "lucide-react";
import { Link } from "react-router"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function MenuDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Menu />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-40" align="start">
				<Input className="mb-2" placeholder="Search..." />
				<DropdownMenuItem> <Link to="/profile/:id">Profile</Link> </DropdownMenuItem>
				<DropdownMenuItem> <Link to="/settings">Settings</Link> </DropdownMenuItem>
				<DropdownMenuItem> <Link to="/contact">Support</Link> </DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem> <Link to="/rooms/new">New Room</Link> </DropdownMenuItem>
				<DropdownMenuItem> <Link to="/polls/new">New Poll</Link> </DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem> <Link to="/login">Log out</Link> </DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
