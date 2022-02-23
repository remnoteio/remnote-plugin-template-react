import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { defaultRemNotePluginViteConfig } from "remnote-plugin-sdk";
const { resolve } = require("path");

export function defaultRemNotePluginViteConfig(
  resolve: any,
  plugins: any[],
  widgetNames: string[]
) {
  const input: any = {};
  for (const widgetName of ["index", ...widgetNames]) {
    // @ts-ignore
    input[widgetName] = resolve(__dirname, widgetName + ".html");
  }

  return {
    plugins,
    server: {
      port: 3001,
      strictPort: true,
    },
    assetsInclude: ["manifest.json"],
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `[name].js`,
          chunkFileNames: `[name].js`,
          assetFileNames: `[name].[ext]`,
        },
        input,
      },
    },
  };
}

export default defineConfig(
  defaultRemNotePluginViteConfig(require, [react()], ["widget1"])
);
