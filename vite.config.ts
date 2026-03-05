import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "site-dist",
  },
  server: {
    port: 3600,
    proxy: {
      "/storybook": {
        target: "http://localhost:6006",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/storybook/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@lib": path.resolve(__dirname, "src/lib"),
    },
  },
});
