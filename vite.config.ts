import react from "@vitejs/plugin-react";
import * as path from "node:path";
import { defineConfig } from "vitest/config";
import packageJson from "./package.json" with { type: "json" };
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "gong.mp3"],
      // Generate a service worker using Workbox with our caching rules
      workbox: {
        runtimeCaching: [
          {
            // Cache JS/CSS/Images/Audio/Fonts with CacheFirst strategy
            urlPattern: ({ request }) => {
              const dest = request.destination || "";
              return ["script", "style", "image", "audio", "font"].includes(
                dest,
              );
            },
            handler: "CacheFirst",
            options: {
              cacheName: "assets-cache",
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            // For navigation requests (HTML), use NetworkFirst, fallback to cache
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkFirst",
            options: {
              cacheName: "html-cache",
              networkTimeoutSeconds: 10,
            },
          },
        ],
      },
    }),
  ],

  resolve: {
    alias: {
      '@softer-components/redux-adapter': path.resolve(__dirname, '../softer-components/packages/redux-adapter/src'),
      '@softer-components/types': path.resolve(__dirname, '../softer-components/packages/types/src'),
      '@softer-components/utils': path.resolve(__dirname, '../softer-components/packages/utils/src'),
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
