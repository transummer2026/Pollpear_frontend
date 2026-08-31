import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ApiError } from "@/lib/fetcher";
import {
  type UserChangePasswordDTO,
  UserChangePasswordSchema,
} from "@shared/schemas/auth.schema";
import { usePasswordChange } from "@/hooks/me/use-password-change";
import FieldMessage from "@/components/FieldMessage";
import { useFieldHints } from "@/hooks/use-field-hints";

/**
 * Password change for a signed-in user, current password included — the session
 * alone does not authorise it. The requirements are shown live as the new one
 * is typed, read straight from the shared schema (see useFieldHints).
 */
export default function ChangePasswordCardUser() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<UserChangePasswordDTO>({
    resolver: zodResolver(UserChangePasswordSchema),
  });

  const { withHints, hintsFor } = useFieldHints(
    UserChangePasswordSchema,
    control,
  );

  const { trigger, isMutating } = usePasswordChange();

  const onSubmit: SubmitHandler<UserChangePasswordDTO> = async (data) => {
    try {
      await trigger(data);
      toast.success("Password changed successfully");
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  };

  return (
    <>
      <CardHeader className="">
        <CardTitle className="text-2xl">Change your password</CardTitle>
      </CardHeader>
      <div className="grid md:grid-cols-1">
        <CardContent className="p-6 border-b md:border-b-0 md:border-r p-6 space-y-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="m-4">
              <Input
                type="password"
                placeholder="Password"
                {...withHints(register("oldPassword"))}
              />
              <FieldMessage
                hints={hintsFor("oldPassword")}
                error={errors.oldPassword?.message}
              />
            </div>
            <div className="m-4">
              <Input
                type="password"
                placeholder="New Password"
                {...withHints(register("password"))}
              />
              <FieldMessage
                hints={hintsFor("password")}
                error={errors.password?.message}
              />
            </div>
            <div className="m-4">
              <Input
                type="password"
                placeholder="Confirm Password"
                {...withHints(register("confirmPassword"))}
              />
              <FieldMessage
                hints={hintsFor("confirmPassword")}
                error={errors.confirmPassword?.message}
              />
            </div>
            <Button type="submit" className="m-4" disabled={isMutating}>
              Change your Password
            </Button>
          </form>
        </CardContent>
      </div>
    </>
  );
}
