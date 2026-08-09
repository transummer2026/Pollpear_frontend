import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Link, Navigate, useSearchParams } from "react-router";
import { useVerifyEmail } from "@/hooks/auth/use-verify-email";

export default function VerifyEmailCard() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const { error, isLoading } = useVerifyEmail(token || null);

  if (!token) {
    return <Navigate to="/auth/verify-email/resend" replace />;
  }

  return (
    <Card className="max-w-xl mx-auto w-full text-center">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Email verification</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-6 space-y-4">
        {isLoading && (
          <div className="flex items-center justify-center gap-2">
            <Spinner />
            <CardDescription>Verifying your email...</CardDescription>
          </div>
        )}
        {!isLoading && !error && (
          <>
            <CardDescription>Your email has been verified.</CardDescription>
            <Button asChild className="m-4">
              <Link to="/auth/login">Go to login</Link>
            </Button>
          </>
        )}
        {!isLoading && error && (
          <>
            <CardDescription className="text-destructive">
              {error.message}
            </CardDescription>
            <Button asChild className="m-4">
              <Link to="/auth/verify-email/resend">
                Resend verification email
              </Link>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
