import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Admin() {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />

			<main className="flex-1">
				<div className="flex justify-center">
					<h1>Admin</h1>
				</div>
			</main>

			<Footer />
		</div>
	);
}