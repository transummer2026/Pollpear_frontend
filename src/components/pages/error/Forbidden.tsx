import { useNavigate } from "react-router";
import { ArrowLeft, Home, ShieldAlert } from "lucide-react";

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

type ForbiddenProps = {
  title?: string;
  description?: string;
};

export default function Forbidden({
  title = "Access denied",
  description = "You don't have permission to view this page.",
}: ForbiddenProps) {
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
            <ShieldAlert />
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
