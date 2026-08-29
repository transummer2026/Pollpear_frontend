import { useState } from "react";
import { Link } from "react-router";
import { Check } from "lucide-react";
import { AddIcon } from "@/components/icons";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { Button } from "@/components/ui/button";
import { Item, ItemTitle } from "@/components/ui/item";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import FriendAvatarUser from "@/components/user/FriendsAndRoomsUser/FriendAvatarUser";
import type { Friend } from "@/components/user/FriendsAndRoomsUser/friends";
import { useSendPearticipantRequest } from "@/hooks/room/use-pearticipants";
import { ApiError } from "@/lib/fetcher";

/** Mirrors InvitationCreateSchema's `message.max(255)` in the shared schema. */
const MESSAGE_MAX = 255;

type RoomAddPearticipantRowProps = {
  roomId: number;
  friend: Friend;
  /** already has a pending invitation for this room */
  isInvited: boolean;
};

/**
 * One row owns one mutation: the hook binds a single userId, so the invite
 * button has to live in its own component rather than in the dialog's map. The
 * invite opens a popover where an optional note can be attached to the
 * invitation before it is sent — the invitee sees it next to the invite.
 */
export default function RoomAddPearticipantRow({
  roomId,
  friend,
  isInvited,
}: RoomAddPearticipantRowProps) {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useSendPearticipantRequest(roomId, friend.id);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const invite = async () => {
    if (isMutating) return;
    const note = message.trim();
    try {
      await trigger({ message: note || undefined });
      await mutate(`/rooms/${roomId}`);
      setOpen(false);
      setMessage("");
      toast.success(`Invitation sent to ${friend.name}`);
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  };

  return (
    <Item className="flex items-center justify-between gap-2 p-2 border-b border-gray-200">
      <Link
        to={`/users/${friend.id}`}
        className="flex min-w-0 flex-1 items-center"
      >
        <FriendAvatarUser friend={friend} />
        <ItemTitle className="ml-4 min-w-0 flex-1 truncate">
          {friend.name}
        </ItemTitle>
      </Link>

      {isInvited ? (
        <span className="flex items-center gap-1 pr-2 text-xs text-muted-foreground">
          <Check className="h-3 w-3" />
          Invited
        </span>
      ) : (
        <Popover
          open={open}
          onOpenChange={(next) => {
            setOpen(next);
            if (!next) setMessage("");
          }}
        >
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Invite ${friend.name}`}
            >
              <AddIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end">
            <div className="space-y-1">
              <label
                htmlFor={`invite-message-${friend.id}`}
                className="text-sm font-medium"
              >
                Invite {friend.name}
              </label>
              <p className="text-xs text-muted-foreground">
                Add a note (optional)
              </p>
            </div>
            <Textarea
              id={`invite-message-${friend.id}`}
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, MESSAGE_MAX))}
              maxLength={MESSAGE_MAX}
              placeholder={`Come join us, ${friend.name}!`}
              className="min-h-20 text-sm"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {message.length}/{MESSAGE_MAX}
              </span>
              <Button
                type="button"
                size="sm"
                disabled={isMutating}
                onClick={invite}
              >
                Send invitation
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </Item>
  );
}
