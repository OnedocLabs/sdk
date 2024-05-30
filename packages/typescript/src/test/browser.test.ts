/**
 * @vitest-environment jsdom
 */

import { describe, it, expect } from "vitest";
import { FileforgeClient } from "@/client";

describe("browser", () => {
  it("should work", () => {
    // Ensure that File is not available in the global scope
    expect(global.File).toBeDefined();

    expect(
      new FileforgeClient({
        apiKey: process.env.FILEFORGE_API_KEY,
      }),
    ).toBeInstanceOf(FileforgeClient);
  });
});
