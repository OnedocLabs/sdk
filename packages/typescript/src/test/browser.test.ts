/**
 * @vitest-environment jsdom
 */

import { describe, it, expect } from "vitest";
import { FileforgeClient } from "@/client";
import { fileFromPath } from "formdata-node/file-from-path";

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

  it("should accept file", async () => {
    const ff = new FileforgeClient({
      apiKey: process.env.FILEFORGE_API_KEY,
    });

    await ff.pdf.form.mark(
      await fileFromPath(__dirname + "/samples/form.pdf"),
      {},
    );
  });
});
