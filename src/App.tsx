import AppRoutes from "./routes/AppRoutes";
import ApiErrorRedirect from "@/components/ApiErrorRedirect";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useSocketConnection } from "@/hooks/use-socket";
import { useFriendPresence } from "@/hooks/friend/use-friend-presence";
import { useNotificationFeed } from "@/hooks/notification/use-notification-feed";
import { useApplyUserTheme } from "@/hooks/use-theme";

/**
 * Everything that has to live for as long as the session does, mounted once and
 * above the router: the socket connection and the three listeners feeding off
 * it, plus the theme. Mounting them per page would open a socket per navigation
 * and lose the events fired in between.
 */
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
