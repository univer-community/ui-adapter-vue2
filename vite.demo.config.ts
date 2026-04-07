import path from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";

export default defineConfig({
  plugins: [vue()],
  root: "demo",
  build: {
    outDir: path.resolve(process.cwd(), "demo-dist"),
    emptyOutDir: true,
  },
});
