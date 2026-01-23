import react from "@vitejs/plugin-react";
import * as path from "node:path";
import { defineConfig } from "vitest/config";
import packageJson from "./package.json" with { type: "json" };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Set base path for GitHub Pages
  base: "/meditation-reso/",

  resolve: {
    alias: {
      "@softer-components/redux-adapter": path.resolve(
        __dirname,
        "../softer-components/packages/redux-adapter/src",
      ),
      "@softer-components/utils": path.resolve(
        __dirname,
        "../softer-components/packages/utils/src",
      ),
      "@softer-components/types": path.resolve(
        __dirname,
        "../softer-components/packages/types/src",
      ),
    },
  },

  server: {
    open: true,
  },

  test: {
    root: import.meta.dirname,
    name: packageJson.name,
    environment: "jsdom",

    typecheck: {
      enabled: true,
      tsconfig: path.join(import.meta.dirname, "tsconfig.json"),
    },

    globals: true,
  },
});
