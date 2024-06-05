import "dotenv/config";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    browser: {
      enabled: true,
      headless: true,
      name: "chrome",
    },
    include: ["packages/**/*.browsertest.ts"],
  },
  define: {
    __FILEFORGE_API_KEY__: process.env.FILEFORGE_API_KEY,
  },
});
