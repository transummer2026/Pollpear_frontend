import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SyncSection() {
  return (
    <div>
      <CardHeader>
        <CardTitle className="text-2xl">Sync your profile</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground mt-2">
        Change your password
      </CardContent>
    </div>
  );
}
