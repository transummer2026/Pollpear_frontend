import { Button } from "@/components/ui/button";
import { GATEWAY_URL } from "@/lib/fetcher";

/**
 * The three OAuth providers. Plain links, not fetches: the flow is a full-page
 * redirect to the gateway, which bounces to the provider and back — an XHR
 * would be blocked by CORS and would lose the redirect anyway.
 */
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
