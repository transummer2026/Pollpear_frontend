import { useNavigate } from "react-router";
import { ArrowLeft, Construction } from "lucide-react";

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

type MaintenanceProps = {
  title?: string;
  description?: string;
};

export default function Maintenance({
  title = "Under maintenance",
  description = "This page is not available yet. It is being worked on and will land in a future release.",
}: MaintenanceProps) {
  const navigate = useNavigate();

  // Shared route, so the way back cannot be hardcoded: step back in history,
  // and fall back to the home page when the page was opened directly.
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
            <Construction />
          </EmptyMedia>
          <EmptyTitle>{title}</EmptyTitle>
          <EmptyDescription>{description}</EmptyDescription>
        </EmptyHeader>

        <EmptyContent>
          <Button variant="outline" onClick={goBack}>
            <ArrowLeft size={16} />
            Go back
          </Button>
        </EmptyContent>
      </Empty>
    </Layout>
  );
}
