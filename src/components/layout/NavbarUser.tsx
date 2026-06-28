import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router"
import { LogoButton } from "@/components/layout/LogoButton";
import { Menubar } from "@/components/ui/menubar"
import { MenuDropdown } from "@/components/layout/MenuDropdown";

export default function NavbarUser() {
	return (
		<Menubar className="flex h-16 items-center px-6 border-x-0 border-t-0">
			<LogoButton />
			<div className="ml-auto hidden md:flex items-center flex-1">
				<Input className="w-72 ml-4 " placeholder="Search..." />
				<div className="ml-auto flex items-center gap-4">
					<Button variant="outline"> <Link to="/rooms/new">New Room</Link> </Button>
					<Button variant="outline"> <Link to="/polls/new">New Poll</Link> </Button>
					<MenuDropdown />
				</div>
			</div>
			<div className="ml-auto md:hidden">
				<MenuDropdown />
			</div>
		</Menubar>
	)
}