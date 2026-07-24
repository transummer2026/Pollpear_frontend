import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function OAuthButtons() {
  return (
    <div className="p-4 flex justify-between">
      <Button
        asChild
        type="button"
        variant="outline"
        className="flex-1 w-1/3 mr-4"
      >
        <Link to="/auth/oauth/github">GitHub</Link>
      </Button>
      <Button asChild type="button" variant="outline" className="flex-1 w-1/3">
        <Link to="/auth/oauth/42">42</Link>
      </Button>
      <Button
        asChild
        type="button"
        variant="outline"
        className="flex-1 w-1/3 ml-4"
      >
        <Link to="/auth/oauth/google">Google</Link>
      </Button>
    </div>
  );
}
