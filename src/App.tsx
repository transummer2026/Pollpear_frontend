import AppRoutes from "./routes/AppRoutes";
import ApiErrorRedirect from "@/components/ApiErrorRedirect";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useSocketConnection } from "@/hooks/use-socket";
import { useFriendPresence } from "@/hooks/friend/use-friend-presence";
import { useNotificationFeed } from "@/hooks/notification/use-notification-feed";
import { useApplyUserTheme } from "@/hooks/use-theme";

function App() {
  useSocketConnection();
  useFriendPresence();
  useNotificationFeed();
  useApplyUserTheme();
  return (
    <ErrorBoundary>
      <ApiErrorRedirect />
      <AppRoutes />
    </ErrorBoundary>
  );
}

export default App;
