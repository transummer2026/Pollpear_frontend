import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type RegisterDTO,
  type RegisterInput,
  RegisterSchema,
} from "@shared/schemas/auth.schema";
import RegisterCardAuth from "@/components/auth/RegisterCardAuth";
import RegisterCardHeader from "@/components/auth/RegisterCardHeader";
import RegisterCardInfos from "@/components/auth/RegisterCardInfos";
import { useRegister } from "@/hooks/auth/use-register";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { ApiError } from "@/lib/fetcher";

/**
 * Full signup form, split in two columns: what the account needs on the left,
 * what is optional on the right. No session is opened on success — the user is
 * sent to the login page, with a verification mail on the way.
 */
export default function RegisterCard() {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterInput, unknown, RegisterDTO>({
    resolver: zodResolver(RegisterSchema),
  });

  const { trigger, isMutating } = useRegister();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterDTO> = async (data) => {
    try {
      await trigger(data);
      toast.success("Check your inbox to confirm your email address");
      navigate("/auth/login", { replace: true });
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  };

  return (
    <Card className="max-w-4xl mx-auto w-full">
      <RegisterCardHeader />
      <Separator />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2">
          <RegisterCardAuth
            register={register}
            errors={errors}
            control={control}
          />
          <RegisterCardInfos register={register} errors={errors} />
        </div>
        <Button type="submit" className="m-6" disabled={isMutating}>
          Sign up
        </Button>
      </form>
    </Card>
  );
}
