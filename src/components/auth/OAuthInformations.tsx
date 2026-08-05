import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ApiError } from "@/lib/fetcher";
import { useSWRConfig } from "swr";
import {
  type OauthRegisterSchemaInput,
  type OauthRegisterSchemaDTO,
  OauthRegisterSchema,
} from "@shared/schemas/auth.schema";
import { useMe } from "@/hooks/user/use-me";
import { useOAuthComplete } from "@/hooks/auth/use-oauth-complete";
import type { UserDTO } from "@shared/schemas/users.schema";
import ProfileCardGender from "@/components/me/ProfileCardGender";

function toDateInput(value: UserDTO["birthdate"] | undefined): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function toFormValues(user: UserDTO): OauthRegisterSchemaInput {
  return {
    username: user.username ?? "",
    birthdate: toDateInput(user.birthdate),
    nationality: user.nationality ?? "",
    name: user.name ?? "",
    surname: user.surname ?? "",
    city: user.city ?? "",
    state: user.state ?? "",
    country: user.country ?? "",
    company: user.company ?? "",
    gender: user.gender,
  };
}

export default function InformationSection() {
  const { data: user } = useMe();

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<OauthRegisterSchemaInput, unknown, OauthRegisterSchemaDTO>({
    resolver: zodResolver(OauthRegisterSchema),
    values: user ? toFormValues(user) : undefined,
    resetOptions: { keepDirtyValues: true },
  });
  const { mutate } = useSWRConfig();

  const { trigger, isMutating } = useOAuthComplete();

  const onSubmit: SubmitHandler<OauthRegisterSchemaDTO> = async (data) => {
    try {
      const updated = await trigger(data);
      await mutate("/me", updated, { revalidate: false });
      if (updated) reset(toFormValues(updated));
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  };

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
                {errors.nationality && (
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
