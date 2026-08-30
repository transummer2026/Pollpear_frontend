import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginDTO, LoginSchema } from "@shared/schemas/auth.schema";
import { useLogin } from "@/hooks/auth/use-login";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { ApiError } from "@/lib/fetcher";
import { useSWRConfig } from "swr";
import OAuthButtons from "./OAuthButtons";

/** the login half of AuthSlider: no Card of its own, it fills the slider panel */
export default function LoginCard() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginDTO>({
    resolver: zodResolver(LoginSchema),
  });
  const { mutate } = useSWRConfig();

  const { trigger, isMutating } = useLogin();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginDTO> = async (data) => {
    try {
      const user = await trigger(data);
      await mutate("/me", user, { revalidate: false });
      navigate("/feed", { replace: true });
    } catch (e) {
      if (e instanceof ApiError && e.message === "Email not verified.") {
        toast.error(e.message, {
          action: {
            label: "Resend email",
            onClick: () => navigate("/auth/verify-email/resend"),
          },
        });
      } else if (e instanceof ApiError) {
        toast.error(e.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-h-full flex-col justify-center gap-4 px-6 py-8"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Welcome back !</h2>
        <p className="text-sm text-muted-foreground">Login to your account</p>
      </div>

      <OAuthButtons />

      <div className="space-y-4">
        <div>
          <Input type="email" placeholder="Email" {...register("email")} />
          {errors.email && (
            <p className="text-destructive text-sm mt-1">
              {errors.email?.message}
            </p>
          )}
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-destructive text-sm mt-1">
              {errors.password?.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full mt-4 bg-[#325024] text-white hover:bg-[#325024]/80"
          disabled={isMutating}
        >
          Sign in
        </Button>
        <div className="text-right">
          <Link
            to="/auth/password-forgot"
            className="text-sm text-gray-500 hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </form>
  );
}
