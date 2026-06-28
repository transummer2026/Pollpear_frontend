import { Link } from "react-router"
import logo from "../../assets/pwar.jpg";

export function LogoButton() {
	return (
		<Link to="/feed">
			<img
				src={logo}
				alt="Logo"
				className="h-10 w-10 rounded-full object-cover cursor-pointer"
			/>
		</Link>
	)
}