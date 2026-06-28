import { Input } from "@/components/ui/input";

// TODO: create a component for calendar

export default function RegisterCardInfos() {
	return (
    <div className="p-6 space-y-4">
      <Input placeholder="First name" />
      <Input placeholder="Last name" />
      <Input placeholder="Date of birth" />
      <Input placeholder="Orogin" />
      <Input placeholder="City" />
    </div>
	);
}