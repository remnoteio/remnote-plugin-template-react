import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { defaultRemNotePluginViteConfig } from "remnote-plugin-sdk";
const { resolve } = require("path");

export default defineConfig(
  defaultRemNotePluginViteConfig(require, [react()], ["widget1"])
);
