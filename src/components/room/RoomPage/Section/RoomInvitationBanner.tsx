import type { ReactNode } from "react";
import { Link } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { Door01Icon } from "@hugeicons/core-free-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RoomInvitationActions from "@/components/room/RoomInvitationActions";
import { useAuth } from "@/hooks/auth/use-auth";
import { useRoomInvitation } from "@/hooks/room/use-pearticipants";

type RoomInvitationBannerProps = {
  roomId: number;
  /** Shown instead of the banner when the viewer has no pending invitation here. */
  fallback?: ReactNode;
};

/**
 * The room-page entry point for a pending invitation: the invitee lands here
 * from the notification and gets the inviter, the note they attached, and the
 * accept/decline pair — the only way in. It stands on its own
 * `useRoomInvitation` (readable by the invitee even for a private room they
 * can't load yet), so it also doubles as the "Room not found" replacement
 * when `useRoom` 404s on an unaccepted private invite: render it with a
 * `fallback` and it shows that whenever there's nothing pending.
 */
export default function RoomInvitationBanner({
  roomId,
  fallback = null,
}: RoomInvitationBannerProps) {
  const { data: me } = useAuth();
  const { data: invitation, isLoading } = useRoomInvitation(roomId, me?.id);

  if (isLoading) return null;
  if (
    !invitation ||
    invitation.status !== "pending" ||
    invitation.inviteeId !== me?.id
  ) {
    return <>{fallback}</>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
          <HugeiconsIcon icon={Door01Icon} strokeWidth={2} />
        </span>
        <div className="min-w-0 flex-1">
          <CardTitle className="truncate text-base">
            You&rsquo;ve been invited to {invitation.room.name}
          </CardTitle>
          <p className="mt-0.5 text-base text-muted-foreground">
            Invited by{" "}
            <Link
              to={`/users/${invitation.inviterId}`}
              className="hover:underline"
            >
              {invitation.inviter.username}
            </Link>
          </p>
        </div>
        <RoomInvitationActions roomId={roomId} invitation={invitation} />
      </CardHeader>
      {invitation.message && (
        <CardContent>
          <blockquote className="border-l-2 pl-3 text-base italic text-muted-foreground">
            {invitation.message}
          </blockquote>
        </CardContent>
      )}
    </Card>
  );
}
