import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.config.js";
import tailwindcss from "@tailwindcss/vite";

// ✅ ESM-safe imports
import path from "path";
import { fileURLToPath } from "url";

// ✅ Recreate __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), crx({ manifest }), tailwindcss()],
  build: {
    outDir: "dist",
  },
  server: {
    cors: {
      origin: [/chrome-extension:\/\//],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
