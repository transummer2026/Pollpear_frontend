import { Input } from "@/components/ui/input";

export default function RegisterCardAuth() {
	return (
		<div className="p-6 border-b md:border-b-0 md:border-r p-6 space-y-4">
			<Input type="text" placeholder="Username" />
			<Input type="email" placeholder="Email" />
			<Input type="password" placeholder="Password" />
			<Input type="password" placeholder="Confirm Password" />
		</div>
	);
}