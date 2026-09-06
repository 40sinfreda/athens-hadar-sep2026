import { copyFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const root = dirname(fileURLToPath(import.meta.url));

function spaFallback() {
  return {
    name: "spa-fallback",
    closeBundle() {
      const dir = resolve(root, "dist-pages");
      const built = existsSync(resolve(dir, "pages.html"))
        ? resolve(dir, "pages.html")
        : resolve(dir, "index.html");
      if (!existsSync(built)) return;
      copyFileSync(built, resolve(dir, "index.html"));
      copyFileSync(built, resolve(dir, "404.html"));
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), spaFallback()],
  base: "/athens-hadar-sep2026/",
  publicDir: resolve(root, "public"),
  resolve: {
    alias: { "@": resolve(root, "src") },
  },
  define: {
    "import.meta.env.VITE_AUTH_ENABLED": JSON.stringify("false"),
  },
  build: {
    outDir: resolve(root, "dist-pages"),
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(root, "pages.html"),
    },
  },
});
