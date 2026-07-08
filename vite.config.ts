import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  envDir: path.resolve(__dirname, '../'),
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
    coverage: {
      provider: "v8",
      reporter: ["lcov"],
      reportsDirectory: "./coverage",
    },
  },
});
