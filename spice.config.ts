import { resolve } from "node:path";
import { defineConfig } from "@spicemod/creator";
import svgrPlugin from "esbuild-plugin-svgr";

// Learn more: https://github.com/sanoojes/spicetify-creator
export default defineConfig({
  name: "glassify",
  framework: "react",
  linter: "oxlint",
  template: "theme",
  packageManager: "bun",
  esbuildOptions: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@icons": resolve(__dirname, "assets/icons/"),
    },
    plugins: [svgrPlugin()],
  },
});
