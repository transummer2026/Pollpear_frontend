import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter } from "react-router";

// Providers that have to sit above the router: tooltips anchor to it, and the
// toaster outlives any navigation that fires a toast on its way out.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TooltipProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </TooltipProvider>
  </StrictMode>,
);
