import { MessageCircle, Send } from "lucide-react";
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
import type { RoomReadDTO } from "@shared/schemas/rooms.schema";

type RoomMessagesProps = {
  room: RoomReadDTO;
  className?: string;
};

/**
 * @note: shell only, the chat itself (websocket, send, history) comes later.
 */
export default function RoomMessages({ room, className }: RoomMessagesProps) {
  return (
    <Card className={cn("lg:h-80", className)}>
      <CardHeader>
        <CardTitle className="text-lg">Messages</CardTitle>
      </CardHeader>
      <CardContent className="min-h-0 flex-1">
        <ScrollArea className="h-full pr-2">
          {room.messages.length === 0 ? (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <MessageCircle />
                </EmptyMedia>
                <EmptyTitle>No message yet</EmptyTitle>
                <EmptyDescription>Chat is coming soon</EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <ul className="space-y-2">
              {room.messages.map((message, index) => (
                <li key={index} className="text-sm">
                  <span className="text-muted-foreground">
                    #{message.authorId}
                  </span>{" "}
                  {message.content}
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="gap-2">
        <Input placeholder="Coming soon…" disabled aria-label="Message" />
        <Button size="icon" disabled aria-label="Send message">
          <Send />
        </Button>
      </CardFooter>
    </Card>
  );
}
