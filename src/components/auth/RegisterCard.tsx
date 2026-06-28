import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import RegisterCardInfos from "@/components/auth/RegisterCardInfos";
import RegisterCardAuth from "@/components/auth/RegisterCardAuth";
import RegisterCardHeader from "@/components/auth/RegisterCardHeader";

export default function RegisterCard() {
	return (
    <Card className="max-w-4xl">
     	<RegisterCardHeader />
      <Separator />
      <div className="grid md:grid-cols-2">
          <RegisterCardAuth />
          <RegisterCardInfos />
      </div>
      <Button className="m-6">Sign up</Button>
    </Card>
	);
}
