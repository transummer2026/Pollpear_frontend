import {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import OAuthButtons from "./OAuthButtons";
import { Link } from "react-router";

export default function RegisterCardHeader() {
  return (
    <CardHeader className="text-center px-4">
      <CardTitle className="text-2xl">Create a free account</CardTitle>
      <CardDescription className="text-sm text-muted-foreground">
        Or{" "}
        <Link to="/auth/login" className="hover:underline">
          log into your account
        </Link>
      </CardDescription>
      <Separator />
      <CardContent className="px-4">
        <div className="text-center">Register with</div>
        <OAuthButtons />
      </CardContent>
    </CardHeader>
  );
}
