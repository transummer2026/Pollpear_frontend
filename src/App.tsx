import AppRoutes from "./routes/AppRoutes";
import ApiErrorRedirect from "@/components/ApiErrorRedirect";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useSocketConnection } from "@/hooks/use-socket";
import { useFriendPresence } from "@/hooks/friend/use-friend-presence";

function App() {
  useSocketConnection();
  useFriendPresence();
  return (
    <ErrorBoundary>
      <ApiErrorRedirect />
      <AppRoutes />
    </ErrorBoundary>
  );
}

export default App;
