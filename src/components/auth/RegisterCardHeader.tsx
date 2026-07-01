import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export default function RegisterCardHeader() {
	return (
		<CardHeader className="text-center">
			<CardTitle className="text-3xl"> 
					Create a free account
			</CardTitle>
			<CardDescription className="text-sm text-muted-foreground">
					Or 	<Link to="/login" className="hover:underline" >
						log into your account
					</Link>
			</CardDescription>
			<Separator />
			<CardContent>
					<div className="text-center">Register with</div>
				<div className="p-4 flex justify-between">
					<Button variant="outline" className="flex-1 w-1/3 mr-4">GitHub</Button>
					<Button variant="outline" className="flex-1 w-1/3">42</Button>
					<Button variant="outline" className="flex-1 w-1/3 ml-4">Google</Button>
				</div>
			</CardContent>
		</CardHeader>
	);
}
