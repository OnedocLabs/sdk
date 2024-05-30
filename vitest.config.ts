import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      provider: "v8",
      reporter: ["html", "json-summary"],
    },
    setupFiles: ["dotenv/config"],
    include: ["packages/**/*.test.ts"],
  },
});
