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

const NEAR_BOTTOM_PX = 48;

const keyOf = (message?: ChatMessage) =>
  message ? (message.tempId ?? message.id) : null;

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
              <ul className="space-y-2">
                {messages.map((message) => (
                  <li
                    key={message.tempId ?? message.id}
                    className={cn(
                      "text-sm",
                      message.tempId && "opacity-60",
                      message.authorId === me?.id && "text-right",
                    )}
                  >
                    <span className="text-muted-foreground">
                      {message.author?.username ?? "Deleted user"}
                      {" · "}
                      {format(new Date(message.createdAt), "HH:mm")}
                    </span>
                    <p className="break-words">{message.content}</p>
                  </li>
                ))}
              </ul>
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
