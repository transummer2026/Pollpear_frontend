import Layout from "@/layout/Layout";
import { ArrowRight, BookOpen } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import ApiKeySection from "@/components/pages/api/ApiKeySection";
import { GATEWAY_URL } from "@/lib/fetcher";

const DOC_ROUTE = `${GATEWAY_URL}/v1/docs`;

/**
 * The API page: the documentation, and the key needed to call it. The docs are
 * served by the gateway itself, next to the versioned public routes.
 */
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

        <CardContent className="space-y-6 pt-2">
          <section className="space-y-3">
            <div className="space-y-1">
              <h2 className="flex items-center gap-2 font-medium">
                <BookOpen size={18} />
                Documentation
              </h2>
              <p className="text-sm text-muted-foreground">
                Resources, verbs and error codes exposed by the public API.
              </p>
            </div>

            <Button variant="outline" asChild>
              <a href={DOC_ROUTE} target="_blank" rel="noopener noreferrer">
                Read the API documentation
                <ArrowRight size={16} />
              </a>
            </Button>
          </section>

          <Separator />

          <ApiKeySection />
        </CardContent>
      </Card>
    </Layout>
  );
}
