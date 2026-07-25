import {
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChangePasswordCardUser() {
  return (
    <>
      <CardHeader className="">
        <CardTitle className="text-2xl">Change your password</CardTitle>
      </CardHeader>
      <div className="grid md:grid-cols-1">
        <CardContent className="p-6 border-b md:border-b-0 md:border-r p-6 space-y-4">
          <div className="m-4">
            <Input type="password" placeholder="Old Password" />
          </div>
          <div className="m-4">
            <Input type="password" placeholder="New Password" />
          </div>
          <div className="m-4">
            <Input type="password" placeholder="Confirm Password" />
          </div>
          <Button type="submit" className="m-4">
            Change your Password
          </Button>
        </CardContent>
      </div>
    </>
  );
}
