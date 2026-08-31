import path from "path";
import type { Plugin } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const healthRoutePlugin: Plugin = {
  name: "dev-health-route",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const pathname = (req.url ?? "").split("?")[0];

      if (pathname !== "/health") {
        next();
        return;
      }

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.end(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>pollpear health</title>
  </head>
  <body>
    <main>OK</main>
  </body>
</html>`);
    });
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), healthRoutePlugin],
  server: {
    host: true,
    port: 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "./Pollpear_shared/src"),
    },
    conditions: ["style", "module", "browser", "import", "default"],
  },
  test: {
    passWithNoTests: true,
    // `e2e/` is a gitignored, local-only Playwright harness: its specs import
    // @playwright/test, so vitest must not try to run them when it is present.
    exclude: ["**/node_modules/**", "**/dist/**", "e2e/**"],
    coverage: {
      provider: "v8",
      reporter: ["lcov"],
      reportsDirectory: "./coverage",
    },
  },
});
