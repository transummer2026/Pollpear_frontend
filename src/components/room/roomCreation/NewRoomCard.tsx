import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import { Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  RoomCreateSchema,
  type RoomCreateDTO,
} from "@shared/schemas/rooms.schema";
import { useRoomCreate } from "@/hooks/room/use-room";
import { toast } from "sonner";
import { ApiError } from "@/lib/fetcher";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import VisibilitySwitch from "@/components/room/roomCreation/SectionParts/VisibilitySwitch";
import DeadlineSetting from "@/components/room/roomCreation/SectionParts/DeadlineSetting";
import {
  type RoomCreationInput,
  defaultValues,
  daysFromNow,
  daysUntil,
  INITIAL_DAYS,
} from "@/components/room/RoomForm";

export default function NewRoomCard() {
  const { trigger, isMutating } = useRoomCreate();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoomCreationInput, unknown, RoomCreateDTO>({
    resolver: zodResolver(RoomCreateSchema) as Resolver<
      RoomCreationInput,
      unknown,
      RoomCreateDTO
    >,
    defaultValues,
  });

  const onSubmit: SubmitHandler<RoomCreateDTO> = async (data) => {
    try {
      await trigger(data);
      toast.success("Poll created");
      reset(defaultValues);
    } catch (err) {
      if (err instanceof ApiError) toast.error(err.message);
      else toast.error("An unknown error occurred");
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle className="text-2xl">Create a room</CardTitle>
          <CardDescription>
            Gather people around your polls in a dedicated space.
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="grid lg:grid-cols-[3fr_auto_2fr] gap-8">
          <div className="space-y-6">
            <CardTitle>Infos</CardTitle>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>

              <Input id="name" placeholder="Room name" {...register("name")} />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description
                <span className="text-muted-foreground"> optional</span>
              </Label>

              <Textarea
                id="description"
                placeholder="Write a description..."
                className="min-h-32"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <Separator orientation="vertical" className="hidden lg:block" />

          <div className="space-y-6">
            <CardTitle>Settings</CardTitle>

            <Controller
              control={control}
              name="visibility"
              render={({ field }) => (
                <VisibilitySwitch
                  isPublic={field.value === "public"}
                  setIsPublic={(checked) =>
                    field.onChange(checked ? "public" : "private")
                  }
                />
              )}
            />

            <Separator />

            <Controller
              control={control}
              name="endsAt"
              render={({ field }) => (
                <DeadlineSetting
                  hasDeadline={field.value !== null}
                  setHasDeadline={(checked) =>
                    field.onChange(checked ? daysFromNow(INITIAL_DAYS) : null)
                  }
                  days={field.value ? daysUntil(field.value) : INITIAL_DAYS}
                  initialDays={INITIAL_DAYS}
                  setDays={(days) => field.onChange(daysFromNow(days))}
                />
              )}
            />
            {errors.endsAt && (
              <p className="text-sm text-destructive">
                {errors.endsAt.message}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="justify-end">
          <Button type="submit" size="lg" disabled={isMutating}>
            Create room
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
