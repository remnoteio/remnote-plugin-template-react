import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const { resolve } = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
      },
      input: {
        index: resolve(__dirname, "index.html"),
        widget1: resolve(__dirname, "widget1.html"),
      },
    },
  },
});
