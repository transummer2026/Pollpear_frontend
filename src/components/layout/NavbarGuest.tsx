import { Menubar } from "@/components/ui/menubar"
import { Button } from "@/components/ui/button"
import { LogoButton } from "@/components/layout/LogoButton";
import { Link } from "react-router"

export default function NavbarGuest() {
	return (
		<Menubar className="flex h-16 items-center px-6 border-x-0 border-t-0">
			<LogoButton />
			<div className="hidden md:flex items-center flex-1">
				<div className="ml-auto flex items-center gap-4">
					<Button asChild variant="ghost">
						<Link to="/login">Log in</Link>
					</Button>
					<Button asChild>
						<Link to="/register">Sign up</Link>
					</Button>
				</div>
			</div>
		</Menubar>
	)
}
