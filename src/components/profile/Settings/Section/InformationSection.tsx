import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ApiError } from "@/lib/fetcher";
import { useSWRConfig } from "swr";
import { type UserProfileUpdateDTO, UserProfileUpdateSchema } from "@shared/schemas/users.schema";
import { useMeUpdate } from "@/hooks/user/use-me";
import ProfileCardGender from "@/components/profile/ProfileCardGender";

export default function InformationSection() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<UserProfileUpdateDTO>({
    resolver: zodResolver(UserProfileUpdateSchema),
  });
  const { mutate } = useSWRConfig();

  const { trigger, isMutating } = useMeUpdate();

  const onSubmit: SubmitHandler<UserProfileUpdateDTO> = async (data) => {
    try {
      const user = await trigger(data);
      await mutate("/me", user, { revalidate: false });
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  };
//TODO: change or not the emai, username, birthdate ? -> need discussion with team
  return (
    <div>
      <CardHeader>
        <CardTitle className="text-2xl">Informations</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground mt-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 border-b md:border-b-0 md:border-r p-6 space-y-4">
            {/* <div>
              <Input type="email" placeholder="Email" {...register("email")} />
              {errors.email && (
                <p className="text-destructive text-sm mt-1">
                  {errors.email?.message}
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
            </div> */}
            <div>
              <Input placeholder="Nationality" {...register("nationality")} />
              {errors.nationality && (
                <p className="text-destructive text-sm mt-1">
                  {errors.nationality?.message}
                </p>
              )}
            </div>
            <div>
              <Input placeholder="First name (optional)" {...register("name")} />
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
              <Input placeholder="Country (optional)" {...register("country")} />
              {errors.country && (
                <p className="text-destructive text-sm mt-1">
                  {errors.country?.message}
                </p>
              )}
            </div>
            <div>
              <Input placeholder="Company (optional)" {...register("company")} />
              {errors.company && (
                <p className="text-destructive text-sm mt-1">
                  {errors.company?.message}
                </p>
              )}
            </div>
              <div>
                <ProfileCardGender
                  errors={errors}
                  control={control}
                />
            </div>

            <Button type="submit" className="m-6" disabled={isMutating}>
              Change Infos
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
