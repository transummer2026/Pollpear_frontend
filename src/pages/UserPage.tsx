import { useParams, Navigate } from "react-router";
import { useAuth } from "@/hooks/auth/use-auth";
import User from "@/components/pages/profile/User";

export default function UserPage() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const { data: me } = useAuth();

  if (me && userId === me.id) {
    return <Navigate to="/me" replace />;
  }

  return <User id={Number.isInteger(userId) ? userId : undefined} />;
}
