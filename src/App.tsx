import AppRoutes from "./routes/AppRoutes";
import ApiErrorRedirect from "@/components/ApiErrorRedirect";
import ErrorBoundary from "@/components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <ApiErrorRedirect />
      <AppRoutes />
    </ErrorBoundary>
  );
}

export default App;
