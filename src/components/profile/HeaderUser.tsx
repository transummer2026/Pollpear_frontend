import { CardHeader, Card, CardTitle } from "@/components/ui/card";

export default function HeaderUser() {
	return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">User Name</CardTitle>
      </CardHeader>
    </Card>
	)
}