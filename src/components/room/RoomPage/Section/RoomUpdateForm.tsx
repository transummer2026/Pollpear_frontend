import {
  useForm,
  Controller,
  type Resolver,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSWRConfig } from "swr";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ApiError } from "@/lib/fetcher";
import {
  RoomUpdateSchema,
  type RoomReadDTO,
  type RoomUpdateDTO,
} from "@shared/schemas/rooms.schema";
import { useRoomUpdate } from "@/hooks/room/use-room";
import VisibilitySwitch from "@/components/room/roomCreation/SectionParts/VisibilitySwitch";
import DeadlineSetting from "@/components/room/roomCreation/SectionParts/DeadlineSetting";
import {
  type RoomCreationInput,
  daysFromNow,
  daysUntil,
  INITIAL_DAYS,
} from "@/components/room/RoomForm";

type RoomUpdateFormProps = {
  room: RoomReadDTO;
  onCancel?: () => void;
  onUpdated?: () => void;
};

/** Fills the form from the room; a room with no deadline comes back as null. */
function toFormValues(room: RoomReadDTO): RoomCreationInput {
  return {
    name: room.name,
    description: room.description ?? "",
    visibility: room.visibility,
    endsAt: room.endsAt ? new Date(room.endsAt) : null,
  };
}

/** See the poll update form: a dirty flag mirrors its field's shape. */
function hasChanged(dirty: unknown): boolean {
  if (Array.isArray(dirty)) return dirty.some(hasChanged);
  if (typeof dirty === "object" && dirty !== null)
    return Object.values(dirty).some(hasChanged);
  return Boolean(dirty);
}

/**
 * Edits a room's own fields. Like the poll form, only what was touched is sent:
 * the update schema is partial, and re-sending an unchanged deadline would fail
 * its "not in the past" check on a room that has been open for a while.
 */
export default function RoomUpdateForm({
  room,
  onCancel,
  onUpdated,
}: RoomUpdateFormProps) {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useRoomUpdate(room.id);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<RoomCreationInput, unknown, RoomUpdateDTO>({
    resolver: zodResolver(RoomUpdateSchema) as unknown as Resolver<
      RoomCreationInput,
      unknown,
      RoomUpdateDTO
    >,
    defaultValues: toFormValues(room),
  });

  const onSubmit: SubmitHandler<RoomUpdateDTO> = async (data) => {
    const changes: RoomUpdateDTO = {};

    if (hasChanged(dirtyFields.name)) changes.name = data.name;
    if (hasChanged(dirtyFields.description))
      changes.description = data.description ?? null;
    if (hasChanged(dirtyFields.visibility))
      changes.visibility = data.visibility;
    if (hasChanged(dirtyFields.endsAt)) changes.endsAt = data.endsAt ?? null;

    if (Object.keys(changes).length === 0) {
      onUpdated?.();
      return;
    }

    try {
      await trigger(changes);
      await mutate(
        (key) => typeof key === "string" && key.startsWith("/rooms"),
      );
      toast.success("Room updated");
      onUpdated?.();
    } catch (err) {
      if (err instanceof ApiError) toast.error(err.message);
      else toast.error("An unknown error occurred");
    }
  };

  return (
    <form className="min-w-0 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_auto_minmax(0,2fr)]">
        <div className="space-y-6">
          <CardTitle>Infos</CardTitle>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>

            <Input id="name" placeholder="Room name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
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
            <p className="text-sm text-destructive">{errors.endsAt.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isMutating}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isMutating}>
          Save changes
        </Button>
      </div>
    </form>
  );
}
