import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { format } from "date-fns";
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

type RoomMessagesProps = {
  className?: string;
};

export default function RoomMessages({ className }: RoomMessagesProps) {
  const { data: me } = useAuth();
  const { messages, hasMore, isLoading, isSending, loadOlder, send } =
    useRoomChat();
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = bottomRef.current?.closest<HTMLElement>(
      "[data-radix-scroll-area-viewport]",
    );
    if (viewport) viewport.scrollTop = viewport.scrollHeight;
  }, [messages.length]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    send(draft);
    setDraft("");
  };

  return (
    <Card className={cn("lg:h-80", className)}>
      <CardHeader>
        <CardTitle className="text-lg">Messages</CardTitle>
      </CardHeader>
      <CardContent className="min-h-0 flex-1">
        <ScrollArea className="h-full pr-2">
          {messages.length === 0 ? (
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
                  onClick={loadOlder}
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
