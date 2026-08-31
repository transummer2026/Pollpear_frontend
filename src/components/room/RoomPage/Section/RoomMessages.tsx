import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { format } from "date-fns";
import { MAX_MESSAGE_LENGTH } from "@shared/schemas/messages.schema";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/auth/use-auth";
import { useRoomChat } from "@/components/room/RoomChat/room-chat-context";
import type { ChatMessage } from "@/hooks/room/chat-reducer";

type RoomMessagesProps = {
  className?: string;
};

// Close enough to the bottom to count as "following the conversation": a new
// message scrolls into view, whereas someone reading further up is left alone.
const NEAR_BOTTOM_PX = 48;

// Consecutive messages from one author, shown as a block: name on top, avatar
// on the last one only.
type Run = { authorId: number; items: ChatMessage[] };

const runsOf = (messages: ChatMessage[]) =>
  messages.reduce<Run[]>((runs, message) => {
    const current = runs[runs.length - 1];
    if (current && current.authorId === message.authorId)
      current.items.push(message);
    else runs.push({ authorId: message.authorId, items: [message] });
    return runs;
  }, []);

// An optimistic message has no real id yet, so its tempId is its React key —
// keeping the same one once it settles avoids remounting the bubble.
const keyOf = (message?: ChatMessage) =>
  message ? (message.tempId ?? message.id) : null;

/**
 * The chat panel: message list, "load older" and composer. All of the state
 * behind it lives in RoomChatProvider — this only handles scrolling, which the
 * DOM alone can get wrong in two ways.
 *
 * Sticking to the bottom, first: a new message should follow the reader down,
 * unless they have scrolled up to read, hence `stickyRef`.
 *
 * Prepending older messages, second: the browser keeps `scrollTop` where it
 * was, so the viewport jumps as content grows above it. `anchorRef` records the
 * distance to the bottom before the fetch and restores it afterwards, which
 * keeps the same message under the reader's eyes.
 */
export default function RoomMessages({ className }: RoomMessagesProps) {
  const { data: me } = useAuth();
  const { messages, hasMore, isLoading, isSending, loadOlder, send } =
    useRoomChat();
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<{
    bottomDistance: number;
    firstKey: string | number | null;
  } | null>(null);
  const stickyRef = useRef(true);
  const hasMessages = messages.length > 0;

  const viewportOf = () =>
    bottomRef.current?.closest<HTMLElement>(
      "[data-radix-scroll-area-viewport]",
    ) ?? null;

  useEffect(() => {
    const viewport = viewportOf();
    if (!viewport) return;
    const anchor = anchorRef.current;

    if (anchor && keyOf(messages[0]) !== anchor.firstKey) {
      viewport.scrollTop = viewport.scrollHeight - anchor.bottomDistance;
      anchorRef.current = null;
      return;
    }
    if (stickyRef.current) viewport.scrollTop = viewport.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const viewport = viewportOf();
    if (!viewport) return;

    const onScroll = () => {
      stickyRef.current =
        viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight <
        NEAR_BOTTOM_PX;
    };

    viewport.addEventListener("scroll", onScroll, { passive: true });
    return () => viewport.removeEventListener("scroll", onScroll);
  }, [hasMessages]);

  const onLoadOlder = () => {
    const viewport = viewportOf();
    anchorRef.current = viewport
      ? {
          bottomDistance: viewport.scrollHeight - viewport.scrollTop,
          firstKey: keyOf(messages[0]),
        }
      : null;
    void loadOlder().then((added) => {
      if (!added) anchorRef.current = null;
    });
  };

  // The input is cleared straight away so typing feels instant; a send that
  // fails puts the text back, unless something has already been typed since.
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const pending = draft;
    setDraft("");
    stickyRef.current = true;
    const sent = await send(pending);
    if (!sent) setDraft((current) => (current === "" ? pending : current));
  };

  return (
    <Card className={cn("lg:h-80", className)}>
      <CardHeader>
        <CardTitle className="text-lg">Messages</CardTitle>
      </CardHeader>
      <CardContent className="min-h-0 flex-1">
        <ScrollArea className="h-full pr-2">
          {!hasMessages ? (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <MessageCircle />
                </EmptyMedia>
                <EmptyTitle>No message yet</EmptyTitle>
                <EmptyDescription>
                  {isLoading ? "Loading the chat…" : "Say the first word."}
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <>
              {hasMore && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="mb-2 w-full"
                  disabled={isLoading}
                  onClick={onLoadOlder}
                >
                  Load older messages
                </Button>
              )}
              <div className="flex flex-col gap-4">
                {runsOf(messages).map((run) => {
                  const mine = run.authorId === me?.id;
                  const username =
                    run.items[0].author?.username ?? "Deleted user";
                  return (
                    <MessageGroup key={keyOf(run.items[0])}>
                      {run.items.map((message, index) => (
                        <Message
                          key={keyOf(message)}
                          align={mine ? "end" : "start"}
                          className={cn(message.tempId && "opacity-60")}
                        >
                          {index === run.items.length - 1 ? (
                            <MessageAvatar>
                              <Avatar className="size-8">
                                <AvatarImage
                                  src={message.author?.avatarUrl}
                                  alt={`${username} avatar`}
                                />
                                <AvatarFallback>
                                  {username.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                            </MessageAvatar>
                          ) : (
                            <MessageAvatar className="invisible" aria-hidden />
                          )}
                          <MessageContent>
                            {index === 0 && (
                              <MessageHeader>
                                {username}
                                <span className="ml-1.5 font-normal">
                                  {format(new Date(message.createdAt), "HH:mm")}
                                </span>
                              </MessageHeader>
                            )}
                            <Bubble variant={mine ? "default" : "muted"}>
                              <BubbleContent>{message.content}</BubbleContent>
                            </Bubble>
                            {message.tempId && (
                              <MessageFooter>Sending…</MessageFooter>
                            )}
                          </MessageContent>
                        </Message>
                      ))}
                    </MessageGroup>
                  );
                })}
              </div>
              <div ref={bottomRef} />
            </>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={onSubmit} className="flex w-full gap-2">
          <Input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            maxLength={MAX_MESSAGE_LENGTH}
            placeholder="Write a message…"
            aria-label="Message"
          />
          <Button
            type="submit"
            size="icon"
            aria-label="Send message"
            disabled={isSending || draft.trim().length === 0}
          >
            <Send />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
