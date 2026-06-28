import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

//TODO: handle the redirection if guest or user
export default function Home() {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />

			<main className="flex-1">
				<div className="flex justify-center">
					<h1>HomePage</h1>
				</div>
			</main>

			<Footer />
		</div>
	);
}