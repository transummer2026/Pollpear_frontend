import Layout from "@/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Api() {
  return (
    <Layout>
      <Card className="max-w-3xl mx-auto mt-4">
        <CardHeader>
          <CardTitle className="text-2xl">API</CardTitle>
          <CardDescription>
            Use a key to call the public API on your behalf
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="text-muted-foreground mt-2">
          Manage your API key
        </CardContent>
      </Card>
    </Layout>
  );
}
