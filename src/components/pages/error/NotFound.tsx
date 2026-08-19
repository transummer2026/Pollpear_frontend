import { useNavigate } from "react-router";
import { ArrowLeft, Home, SearchX } from "lucide-react";

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

type NotFoundProps = {
  title?: string;
  description?: string;
};

export default function NotFound({
  title = "Page not found",
  description = "The page you're looking for doesn't exist or has been moved.",
}: NotFoundProps) {
  const navigate = useNavigate();

  function goBack() {
    if (window.history.length > 1) {
      void navigate(-1);
      return;
    }

    void navigate("/");
  }

  return (
    <Layout>
      <Empty className="mx-auto mt-4 max-w-3xl border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchX />
          </EmptyMedia>
          <EmptyTitle>{title}</EmptyTitle>
          <EmptyDescription>{description}</EmptyDescription>
        </EmptyHeader>

        <EmptyContent>
          <div className="flex gap-2">
            <Button variant="outline" onClick={goBack}>
              <ArrowLeft size={16} />
              Go back
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
