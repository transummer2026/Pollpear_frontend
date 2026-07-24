import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PasswordSection() {
  return (
    <div>
      <CardHeader>
        <CardTitle className="text-2xl">Password</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground mt-2">
        Change your password
      </CardContent>
    </div>
  );
}
