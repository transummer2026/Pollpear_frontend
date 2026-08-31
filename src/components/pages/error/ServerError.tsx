import { useNavigate } from "react-router";
import { Home, RefreshCw, ServerCrash } from "lucide-react";

import Layout from "@/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

type ServerErrorProps = {
  title?: string;
  description?: string;
};

/**
 * Where a 5xx lands, and what the error boundary renders when a component
 * throws — in both cases the app is at fault, not the visitor.
 */
export default function ServerError({
  title = "Something went wrong",
  description = "An unexpected error occurred on our end. Please try again later.",
}: ServerErrorProps) {
  const navigate = useNavigate();

  return (
    <Layout>
      <Empty className="mx-auto mt-4 max-w-3xl border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ServerCrash />
          </EmptyMedia>
          <EmptyTitle>{title}</EmptyTitle>
          <EmptyDescription>{description}</EmptyDescription>
        </EmptyHeader>

        <EmptyContent>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RefreshCw size={16} />
              Try again
            </Button>
            <Button onClick={() => void navigate("/")}>
              <Home size={16} />
              Go home
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </Layout>
  );
}
