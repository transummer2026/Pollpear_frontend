import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ApiError } from "@/lib/fetcher";
import { useSWRConfig } from "swr";
import {
  type OauthRegisterInput,
  type OauthRegisterDTO,
  type OauthPendingDTO,
  OauthRegisterSchema,
} from "@shared/schemas/auth.schema";
import { useOAuthComplete } from "@/hooks/auth/use-oauth-complete";
import ProfileCardGender from "@/components/me/ProfileCardGender";
import { useOAuthPending } from "@/hooks/auth/use-oauth-pending";
import { useNavigate, useSearchParams } from "react-router";

function toFormValues(pending: OauthPendingDTO): OauthRegisterInput {
  return {
    username: pending.username ?? "",
    birthdate: "",
    nationality: "",
    name: pending.name ?? "",
    surname: pending.surname ?? "",
    city: "",
    state: "",
    country: "",
    company: "",
    gender: undefined as unknown as OauthRegisterInput["gender"],
  };
}

export default function InformationSection() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("signup");
  const { data: pending, error: pendingError } = useOAuthPending(token);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<OauthRegisterInput, unknown, OauthRegisterDTO>({
    resolver: zodResolver(OauthRegisterSchema),
    values: pending ? toFormValues(pending) : undefined,
    resetOptions: { keepDirtyValues: true },
  });
  const { mutate } = useSWRConfig();

  const { trigger, isMutating } = useOAuthComplete();

  const onSubmit: SubmitHandler<OauthRegisterDTO> = async (data) => {
    if (!token) return;
    try {
      const updated = await trigger({ ...data, token });
      await mutate("/me", updated, { revalidate: false });
      navigate("/", { replace: true });
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  };

  if (!token || pendingError) {
    return (
      <Card className="w-full max-w-xl mx-auto">
        <div>
          <CardHeader>
            <CardTitle className="text-2xl">Signup Session Expired</CardTitle>
            <p>Your signup session has expired. Please try signing up again.</p>
            <Button
              className="mt-6"
              onClick={() => navigate("/auth/login", { replace: true })}
            >
              Back to Login
            </Button>
          </CardHeader>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-xl mx-auto">
      <div>
        <CardHeader>
          <CardTitle className="text-2xl">Informations Update</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground mt-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6 md:border-b-0 p-6 space-y-4">
              <div>
                <Input placeholder="Username" {...register("username")} />
                {errors.username && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.username?.message}
                  </p>
                )}
              </div>
              <div>
                <Input type="date" {...register("birthdate")} />
                {errors.birthdate && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.birthdate?.message}
                  </p>
                )}
              </div>
              <div>
                <Input placeholder="Nationality" {...register("nationality")} />
                {errors.nationality && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.nationality?.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  placeholder="First name (optional)"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.name?.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  placeholder="Last name (optional)"
                  {...register("surname")}
                />
                {errors.surname && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.surname?.message}
                  </p>
                )}
              </div>
              <div>
                <Input placeholder="City (optional)" {...register("city")} />
                {errors.city && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.city?.message}
                  </p>
                )}
              </div>
              <div>
                <Input placeholder="State (optional)" {...register("state")} />
                {errors.state && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.state?.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  placeholder="Country (optional)"
                  {...register("country")}
                />
                {errors.country && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.country?.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  placeholder="Company (optional)"
                  {...register("company")}
                />
                {errors.company && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.company?.message}
                  </p>
                )}
              </div>
              <div>
                <ProfileCardGender errors={errors} control={control} />
              </div>

              <Button type="submit" className="m-6" disabled={isMutating}>
                Update Infos
              </Button>
            </div>
          </form>
        </CardContent>
      </div>
    </Card>
  );
}
