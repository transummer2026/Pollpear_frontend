import { Badge } from "@/components/ui/badge";
import { Pencil } from "lucide-react";
import { OpenTrashIcon, TrashIcon } from "@/components/icons";
import { HoverIcon } from "@/components/icons/HoverIcon";
import type { PollReadDTO } from "@shared/schemas/polls.schema";
import { useMe } from "@/hooks/user/use-me";
import { useState } from "react";
import { isPollEditable, isPollOwnedBy } from "@/lib/poll";
import PollUpdateDialog from "@/components/poll/pollUpdate/PollUpdateDialog";
import { usePollDelete } from "@/hooks/poll/use-poll";
import { toast } from "sonner";
import { ApiError } from "@/lib/fetcher";
import { useSWRConfig } from "swr";

/**
 * Edit and delete, shown to the author alone and only while the poll is still
 * pending — reshaping a poll people have already answered would rewrite their
 * votes. Renders nothing at all for anyone else, so it can sit in every card
 * header unconditionally.
 */
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
            className="group cursor-pointer"
            onClick={() => handleDelete()}
          >
            <HoverIcon idle={TrashIcon} hover={OpenTrashIcon} />
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
