import { useNavigate } from "react-router";
import { ArrowLeft, LogIn } from "lucide-react";
import { LockedIcon } from "@/components/icons";

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

type UnauthorizedProps = {
  title?: string;
  description?: string;
};

export default function Unauthorized({
  title = "Authentication required",
  description = "You need to be signed in to access this page.",
}: UnauthorizedProps) {
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
            <LockedIcon />
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
            <Button onClick={() => void navigate("/auth/login")}>
              <LogIn size={16} />
              Sign in
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </Layout>
  );
}
