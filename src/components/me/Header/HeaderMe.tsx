import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";
import { Pencil } from "lucide-react";
import HeaderUserHashtags from "./HeaderMeHashtags";
import HeaderUserScores from "./HeaderMeScores";
import { useMeUpdate } from "@/hooks/user/use-me";
import { toast } from "sonner";
import { ApiError } from "@/lib/fetcher";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSWRConfig } from "swr";
import { useMe } from "@/hooks/user/use-me";
import {
  type UserDTO,
  type UserUpdateDTO,
  UserUpdateSchema,
  type UserUpdateInput,
} from "@shared/schemas/users.schema";

function toFormValues(user: UserDTO): UserUpdateInput {
  return {
    username: user.username ?? "",
    bio: user.bio ?? "",
  };
}

export default function HeaderMe() {
  const { data: user } = useMe();

  const hashtags = {
    hashtags: ["#polls", "#crocs", "#Valais", "#vibeconding", "#claude"],
  };

  const [isEditing, setIsEditing] = useState(false);
  function startEditing() {
    setIsEditing(true);
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<UserUpdateInput, unknown, UserUpdateDTO>({
    resolver: zodResolver(UserUpdateSchema),
    values: user ? toFormValues(user) : undefined,
    resetOptions: { keepDirtyValues: true },
  });
  const { mutate } = useSWRConfig();

  const { trigger, isMutating } = useMeUpdate();

  const onSubmit: SubmitHandler<UserUpdateDTO> = async (data) => {
    try {
      const updated = await trigger(data);
      setIsEditing(false);
      await mutate("/me", updated, { revalidate: false });
      if (updated) reset(toFormValues(updated));
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  };

  return (
    <Card
      className={`ring-0 lg:min-h-40 lg:[--card-spacing:--spacing(4)] ${
        isEditing ? "" : "lg:max-h-64"
      }`}
    >
      <CardHeader className="space-y-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/*
            Stacks as username / description / buttons on mobile, the DOM
            order. From md the grid lifts the buttons back up beside the
            username.
          */}
          <div className="grid gap-2 grid-cols-[minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_auto]">
            {isEditing ? (
              <div className="flex flex-col gap-2 md:col-start-1 md:row-start-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" {...register("username")} />
                {errors.username && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.username?.message}
                  </p>
                )}
              </div>
            ) : (
              <CardTitle className="min-w-0 truncate text-2xl font-bold md:col-start-1 md:row-start-1">
                {user?.username}
              </CardTitle>
            )}

            {isEditing ? (
              <div className="flex flex-col gap-2 md:col-start-1 md:row-start-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" {...register("bio")} />
                {errors.bio && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.bio?.message}
                  </p>
                )}
              </div>
            ) : (
              <CardDescription className="wrap-anywhere md:col-start-1 md:row-start-2">
                {user?.bio}
              </CardDescription>
            )}

            <div className="flex gap-2 md:col-start-2 md:row-start-1 md:justify-self-end">
              <Button asChild type="button" variant="outline">
                <Link to="/settings">Settings</Link>
              </Button>
              {isEditing ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      reset(user ? toFormValues(user) : undefined);
                      setIsEditing(false);
                    }}
                    disabled={isMutating}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isMutating}>
                    Save
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  aria-label="Edit Profile"
                  title="Edit profile"
                  className="group rounded-full border-2 shadow-md"
                  onClick={startEditing}
                >
                  <Pencil className="h-4 w-4 transition-transform group-hover:rotate-12" />
                </Button>
              )}
            </div>
          </div>
        </form>
      </CardHeader>
      <Separator />
      <CardContent className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
        <div className="lg:col-span-4 md:col-span-2">
          <HeaderUserScores score={user?.score} />
        </div>
        <div className="space-y-3 lg:col-span-1">
          <HeaderUserHashtags hashtags={hashtags.hashtags} />
        </div>
      </CardContent>
    </Card>
  );
}
