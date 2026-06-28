import NavbarUser from "./NavbarUser";
import NavbarGuest from "./NavbarGuest";

//temporary function, waiting for backend connection
const isLogged = () => {
	return true;
};

export default function Navbar() {
	const user = isLogged();
	return user ? <NavbarUser /> : <NavbarGuest />;
}