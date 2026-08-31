import useSWR from "swr";
import { fetcher, type ApiError } from "@/lib/fetcher";
import type { PollReadDTO } from "@shared/schemas/polls.schema";
import type { RoomReadDTO } from "@shared/schemas/rooms.schema";
import {
  useFriends,
  useFriendshipWithUser,
} from "@/hooks/friend/use-friendship";
import { useMe } from "@/hooks/user/use-me";

/**
 * What each stat is worth in the headline score. `User.score` exists in the
 * database but nothing ever writes to it (it's set to 0 at registration and
 * never touched again), so the number shown in the header is computed here,
 * from data the API already returns. Placeholder weights — tweak freely, the
 * rest of the hook doesn't care.
 */
export const SCORE_WEIGHTS = {
  pollCreated: 10,
  voteReceived: 5,
  activeRoom: 15,
  pearsPal: 3,
} as const;

export type UserScores = {
  /** Weighted total of the three stats below, plus the votes they collected. */
  score?: number;
  /** Accepted friendships. */
  pearsPals?: number;
  /** Rooms they opened that are still running. */
  activeRooms?: number;
  /** Polls they authored. */
  pollsCreated?: number;
  /** Votes cast on those polls, all polls combined. */
  votesReceived?: number;
};

/**
 * The four header stats for a profile, assembled from the existing endpoints
 * — no dedicated stats route on the backend.
 *
 * Own profile and someone else's don't read from the same places:
 * `/polls` and `/rooms` return everything you created, while `/polls?userId=`
 * and `/rooms?userId=` are filtered by what the viewer is allowed to see (and
 * `/polls?userId=` drops anonymous polls entirely). Keys match the ones used
 * by `usePolls`/`useRooms`/`usePollsUser`, so the SWR cache is shared with the
 * rest of the page rather than fetched twice.
 *
 * @param userId - profile being displayed; pass `undefined` to fetch nothing
 */
export function useUserScores(userId?: number): UserScores & {
  isLoading: boolean;
} {
  const { data: me } = useMe();
  const isMe = userId !== undefined && me?.id === userId;

  const { data: friends } = useFriends(userId);
  // `/users/:id/friends` leaves the viewer out of someone else's list, so a
  // friend of ours counts one short until we add ourselves back in.
  const { data: friendship } = useFriendshipWithUser(isMe ? undefined : userId);

  const { data: polls } = useSWR<PollReadDTO[], ApiError>(
    userId ? (isMe ? "/polls" : `/polls?userId=${userId}`) : null,
    fetcher,
  );
  const { data: rooms } = useSWR<RoomReadDTO[], ApiError>(
    userId ? (isMe ? "/rooms" : `/rooms?userId=${userId}`) : null,
    fetcher,
  );

  const pearsPals =
    friends && friends.length + (friendship?.status === "accepted" ? 1 : 0);
  const activeRooms = rooms?.filter((room) => room.status === "active").length;
  const pollsCreated = polls?.length;
  const votesReceived = polls?.reduce(
    (total, poll) => total + poll.voterCount,
    0,
  );

  // Left undefined until every piece has landed: a score that climbs as the
  // requests resolve one by one reads as a bug.
  const isLoading =
    userId !== undefined &&
    (friends === undefined || polls === undefined || rooms === undefined);

  const score = isLoading
    ? undefined
    : (pollsCreated ?? 0) * SCORE_WEIGHTS.pollCreated +
      (votesReceived ?? 0) * SCORE_WEIGHTS.voteReceived +
      (activeRooms ?? 0) * SCORE_WEIGHTS.activeRoom +
      (pearsPals ?? 0) * SCORE_WEIGHTS.pearsPal;

  return {
    score,
    pearsPals,
    activeRooms,
    pollsCreated,
    votesReceived,
    isLoading,
  };
}
