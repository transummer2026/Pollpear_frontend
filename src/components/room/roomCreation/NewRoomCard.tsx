import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
// import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
// import { Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
// import {
//   RoomCreateSchema,
//   type RoomCreateDTO,
// } from "@shared/schemas/rooms.schema";
// import { useCreateRoom } from "@/hooks/poll/use-create-room";
// import { toast } from "sonner";
// import { ApiError } from "@/lib/fetcher";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import VisibilitySwitch from "@/components/room/roomCreation/SectionParts/VisibilitySwitch";
import DeadlineSetting from "@/components/room/roomCreation/SectionParts/DeadlineSetting";

const INITIAL_DAYS = 1;

export default function NewRoomCard() {
  // UI only for now, will be moved to the form once the back is ready
  const [isPublic, setIsPublic] = useState(true);
  const [hasDeadline, setHasDeadline] = useState(false);
  const [days, setDays] = useState(INITIAL_DAYS);

  // const { trigger, isMutating } = useCreateRoom();
  // const {
  //   control,
  //   register,
  //   handleSubmit,
  //   watch,
  //   setValue,
  //   getValues,
  //   reset,
  //   formState: { errors },
  // } = useForm<RoomFormValues, unknown, RoomCreateDTO>({
  //   resolver: zodResolver(RoomCreateSchema) as Resolver<
  //     RoomFormValues,
  //     unknown,
  //     RoomCreateDTO
  //   >,
  //   defaultValues,
  // });

  // const onSubmit: SubmitHandler<RoomCreateDTO> = async (data) => {
  //   try {
  //     await trigger(data);
  //     toast.success("Poll created");
  //     reset(defaultValues);
  //   } catch (err) {
  //     if (err instanceof ApiError) toast.error(err.message);
  //     else toast.error("An unknown error occurred");
  //   }
  // };

  return (
    <Card className="w-full max-w-4xl">
      <form className="space-y-8">
        {/* <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}> */}
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
              <Label>Name</Label>

              <Input placeholder="Room name" />
              {/* <Input placeholder="Room title" {...register} /> */}
              {/* {error && <p className="text-sm text-destructive">{error}</p>} */}
            </div>

            <div className="space-y-2">
              <Label>
                Description
                <span className="text-muted-foreground"> optional</span>
              </Label>

              <Textarea
                placeholder="Write a description..."
                className="min-h-32"
              />
              {/* <Textarea placeholder="Write a description..." {...register} /> */}
              {/* {error && <p className="text-sm text-destructive">{error}</p>} */}
            </div>
          </div>

          <Separator orientation="vertical" className="hidden lg:block" />

          <div className="space-y-6">
            <CardTitle>Settings</CardTitle>

            <VisibilitySwitch isPublic={isPublic} setIsPublic={setIsPublic} />
            {/* <Controller
              control={control}
              name="isPublic"
              render={({ field }) => (
                <VisibilitySwitch
                  isPublic={field.value}
                  setIsPublic={field.onChange}
                />
              )}
            /> */}

            <Separator />

            <DeadlineSetting
              hasDeadline={hasDeadline}
              setHasDeadline={setHasDeadline}
              days={days}
              initialDays={INITIAL_DAYS}
              setDays={setDays}
            />
            {/* <Controller
              control={control}
              name="endsInDays"
              render={({ field }) => (
                <DeadlineSetting
                  hasDeadline={hasDeadline}
                  setHasDeadline={setHasDeadline}
                  days={field.value}
                  initialDays={INITIAL_DAYS}
                  setDays={field.onChange}
                />
              )}
            /> */}
          </div>
        </CardContent>

        <CardFooter className="justify-end">
          <Button type="submit" size="lg">
            {/* <Button type="submit" size="lg" disabled={isMutating}> */}
            Create room
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
