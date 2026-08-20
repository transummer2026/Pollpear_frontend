import AppRoutes from "./routes/AppRoutes";
import ApiErrorRedirect from "@/components/ApiErrorRedirect";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useSocketConnection } from "@/hooks/use-socket";

function App() {
  useSocketConnection();
  return (
    <ErrorBoundary>
      <ApiErrorRedirect />
      <AppRoutes />
    </ErrorBoundary>
  );
}

export default App;
