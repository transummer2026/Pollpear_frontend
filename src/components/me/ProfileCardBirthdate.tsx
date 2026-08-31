import { useState } from "react";
import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { format } from "date-fns";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar03Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BirthdateFormat } from "@shared/schemas/formats.schema";
import { cn } from "@/lib/utils";

type BirthdateField = {
  birthdate?: unknown;
};

/**
 * Where the calendar opens when no birthdate has been picked yet. Starting on
 * the current month would leave every user paging back through decades.
 */
const DEFAULT_MONTH = new Date(2000, 0);
const EARLIEST_MONTH = new Date(1900, 0);

/**
 * The form keeps a birthdate the way the date input did, as a plain
 * "YYYY-MM-DD" day that `z.coerce.date` reads back as UTC midnight. The
 * calendar hands out local-time dates, so converting on both sides is what
 * stops the day from drifting by one either side of UTC.
 */
function toDay(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function fromDay(value: unknown) {
  if (typeof value !== "string") return undefined;
  const day = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!day) return undefined;
  return new Date(Number(day[1]), Number(day[2]) - 1, Number(day[3]));
}

/**
 * Greys out anything the schema would reject — too old, or not old enough to
 * sign up — so the age rule is asked of Zod rather than restated here.
 */
const isRejected = (date: Date) =>
  !BirthdateFormat.safeParse(toDay(date)).success;

/**
 * Birthdate picker, generic over the form holding it — signup, OAuth completion
 * and settings all use it. A calendar rather than a date input: the browser's
 * own is inconsistent across platforms, and a birthdate means paging back
 * decades, which the native control does badly.
 */
export default function ProfileCardBirthdate<
  T extends FieldValues & BirthdateField,
>({ errors, control }: { errors: FieldErrors<T>; control: Control<T> }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Controller
        name={"birthdate" as Path<T>}
        control={control}
        render={({ field }) => {
          const selected = fromDay(field.value);

          return (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "h-9 w-full justify-start rounded-4xl border-input bg-input/30 px-3 py-1 font-normal md:text-sm",
                    !selected && "text-muted-foreground",
                  )}
                >
                  <HugeiconsIcon
                    icon={Calendar03Icon}
                    strokeWidth={2}
                    className="size-4"
                  />
                  {selected ? format(selected, "PPP") : "Birthdate"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  captionLayout="dropdown"
                  defaultMonth={selected ?? DEFAULT_MONTH}
                  startMonth={EARLIEST_MONTH}
                  endMonth={new Date()}
                  selected={selected}
                  disabled={isRejected}
                  onSelect={(date) => {
                    field.onChange(date ? toDay(date) : "");
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          );
        }}
      />
      {errors.birthdate && (
        <p className="text-destructive text-sm mt-1">
          {String(errors.birthdate.message)}
        </p>
      )}
    </div>
  );
}
