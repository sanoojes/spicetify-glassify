import { resolve } from "node:path";
import { defineConfig } from "@spicemod/creator";
import svgrPlugin from "esbuild-plugin-svgr";

// Learn more: https://gitlab.com/sanoojes/spicetify-creator
export default defineConfig({
  name: "glassify",
  framework: "react",
  linter: "oxlint",
  template: "theme",
  packageManager: "bun",
  outDir: "dist",
  esbuildOptions: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@icons": resolve(__dirname, "assets/icons/"),
    },
    plugins: [svgrPlugin()],
  },
});
