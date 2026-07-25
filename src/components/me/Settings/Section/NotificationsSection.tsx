import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function NotificationSection() {
  const [messageNotification, setMessageNotification] = useState(false);
  const [roomNotification, setRoomNotification] = useState(false);

  return (
    <div>
      <CardHeader>
        <CardTitle className="text-2xl">Notifications</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground mt-2">
        <div className="flex items-center gap-2">
          <span>Message Notification</span>
        </div>
        <Switch
          checked={messageNotification}
          onCheckedChange={setMessageNotification}
        />
        <div className="flex items-center gap-2">
          <span>Room Notification</span>
        </div>
        <Switch
          checked={roomNotification}
          onCheckedChange={setRoomNotification}
        />
      </CardContent>
    </div>
  );
}
