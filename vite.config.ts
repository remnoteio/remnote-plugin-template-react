import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

import manifest from "./public/manifest.json";

const port = 4173;

export function viteRemnote() {
  const input: Record<string, string> = {};
  const widgetDefinitions: Record<
    string,
    {
      folder: string;
      widgetHtmlPath: string;
      widgetTsxPath: string;
      widgetName: string;
    }
  > = {};

  for (const widget of ["index", ...(manifest.widgets || [])]) {
    const widgetPath = path.parse(widget);
    const widgetName: string = widgetPath.name;
    const widgetHtmlPath = path.resolve(__dirname, widgetName + ".html");
    const widgetTsxPath = path.resolve(__dirname, "src", widgetName + ".tsx");

    // TODO: Using the widget.html as input/entry file does not work
    // because vite requires it to be present already at the start of the build
    // Maybe https://github.com/hex-ci/vite-plugin-virtual-html-template could be used as solution
    // input[widgetName] = widgetHtmlPath;
    input[widgetName] = widgetTsxPath;
    widgetDefinitions[widgetName] = {
      folder: widgetPath.dir,
      widgetHtmlPath,
      widgetTsxPath,
      widgetName,
    };
  }

  return {
    name: "vite-plugin-remnote",
    // Run before other plugins
    enforce: "pre" as "pre" | "post",
    // Emitting files only works in build mode
    apply: "build" as "build" | "serve",
    config() {
      return {
        build: {
          rollupOptions: {
            input,
            output: {
              entryFileNames: `[name].js`,
              chunkFileNames: `[name].js`,
              assetFileNames: `[name].[ext]`,
            },
          },
        },
      };
    },

    async buildStart() {
      for (const widget in widgetDefinitions) {
        const { folder, widgetName, widgetHtmlPath, widgetTsxPath } =
          widgetDefinitions[widget];
        console.log(
          `Emitting ${widgetHtmlPath} for widget '${widgetName}' in ${widgetTsxPath}`
        );

        this.emitFile({
          type: "asset",
          fileName: `${widgetName}.html`,
          source: `
  <!-- This file should only decalre a root and import the main name .js file. Render any CSS, imports 
  or images from within the index.tsx file after onActivate is called. -->
  <div id="root">Hello from ${widgetName}</div>
  <script type="module" src="/src${folder}/${widgetName}.tsx"></script>
  `,
        });
        // TODO: If we'd want this in serve mode we could just create the index.html like this and
        // add them to the .gitignore? But I guess we never do just vite serve?
        // await writeFile(
        //   path.resolve(__dirname, ),
        //   template,
        //   {
        //     encoding: "utf-8",
        //   }
        // );
      }
    },
  };
}

export default defineConfig({
  plugins: [viteRemnote(), react()],
  server: {
    port,
    strictPort: true,
  },
  preview: {
    port,
    strictPort: true,
  },
  assetsInclude: ["manifest.json"],
  build: {
    sourcemap: true,
  },
});
