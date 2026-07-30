import { Button } from "@/components/ui/button";
import { GATEWAY_URL } from "@/lib/fetcher";

export default function OAuthButtons() {
  return (
    <div className="p-4 flex justify-between">
      <Button
        asChild
        type="button"
        variant="outline"
        className="flex-1 w-1/3 mr-4"
      >
        <a href={`${GATEWAY_URL}/auth/oauth/github`}>GitHub</a>
      </Button>
      <Button asChild type="button" variant="outline" className="flex-1 w-1/3">
        <a href={`${GATEWAY_URL}/auth/oauth/school42`}>42</a>
      </Button>
      <Button
        asChild
        type="button"
        variant="outline"
        className="flex-1 w-1/3 ml-4"
      >
        <a href={`${GATEWAY_URL}/auth/oauth/google`}>Google</a>
      </Button>
    </div>
  );
}
