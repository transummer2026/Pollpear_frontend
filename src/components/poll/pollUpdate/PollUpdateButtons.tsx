import { Badge } from "@/components/ui/badge";
import { Pencil, Trash } from "lucide-react";
import type { PollReadDTO } from "@shared/schemas/polls.schema";
import { useMe } from "@/hooks/user/use-me";
import { useState } from "react";
import { isPollEditable, isPollOwnedBy } from "@/lib/poll";
import PollUpdateDialog from "@/components/poll/pollUpdate/PollUpdateDialog";
import { usePollDelete } from "@/hooks/poll/use-poll";
import { toast } from "sonner";
import { ApiError } from "@/lib/fetcher";
import { useSWRConfig } from "swr";

export default function PollUpdateButtons({ poll }: { poll: PollReadDTO }) {
  const { data: me } = useMe();
  const { mutate } = useSWRConfig();
  const { trigger } = usePollDelete(poll.id);
  const [isEditing, setIsEditing] = useState(false);

  if (!isPollOwnedBy(poll, me?.id)) return null;

  const isEditable = isPollEditable(poll);

  const handleDelete = async () => {
    try {
      await trigger();
      await mutate(`/polls/${poll.id}`);
      await mutate(`/polls`);
      toast.success("Poll has been deleted");
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  };

  return (
    <>
      {isEditable && (
        <div className="flex gap-2">
          <Badge
            variant="secondary"
            aria-label="Edit poll"
            className="group rounded-full border-2 shadow-md cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="h-4 w-4 transition-transform group-hover:rotate-12" />
          </Badge>
          <Badge
            variant="destructive"
            aria-label="Delete poll"
            className="cursor-pointer"
            onClick={() => handleDelete()}
          >
            <Trash />
          </Badge>
        </div>
      )}

      {isEditable && (
        <PollUpdateDialog
          poll={poll}
          open={isEditing}
          onOpenChange={setIsEditing}
        />
      )}
    </>
  );
}
