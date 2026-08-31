import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  type ResendVerificationDTO,
  ResendVerificationSchema,
} from "@shared/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ApiError } from "@/lib/fetcher";
import { useResendVerification } from "@/hooks/auth/use-resend-verification";

/**
 * Sends a fresh verification mail. Same deliberately vague confirmation as the
 * password reset: the answer must not reveal whether the address is registered.
 */
export default function ResendVerificationCard() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ResendVerificationDTO>({
    resolver: zodResolver(ResendVerificationSchema),
  });

  const { trigger, isMutating } = useResendVerification();

  const onSubmit: SubmitHandler<ResendVerificationDTO> = async (data) => {
    try {
      await trigger(data);
      toast.success("If this email exists, a verification link has been sent");
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  };

  return (
    <Card className="max-w-xl mx-auto w-full text-center">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Resend verification email</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Enter the email address you used to create your account with
        </CardDescription>
      </CardHeader>
      <Separator />
      <div className="grid md:grid-cols-1">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-destructive text-sm mt-1">
                {errors.email?.message}
              </p>
            )}
            <Button type="submit" className="m-6" disabled={isMutating}>
              Resend verification email
            </Button>
          </form>
        </CardContent>
      </div>
    </Card>
  );
}
