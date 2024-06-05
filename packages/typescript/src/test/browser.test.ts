/**
 * @vitest-environment jsdom
 */

import { describe, it, expect } from "vitest";
import { FileforgeClient } from "@/client";
import { fileFromPath } from "formdata-node/file-from-path";

const process = {
  env: {
    FILEFORGE_API_KEY: "1466ffcd-95d0-4c84-9ebd-cb0997d4c31c",
  },
};

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

  it.skip("should accept file", async () => {
    const ff = new FileforgeClient({
      apiKey: process.env.FILEFORGE_API_KEY,
    });

    await ff.pdf.form.mark(
      await fileFromPath(__dirname + "/samples/form.pdf"),
      {},
    );
  });

  it("should decode file in generate", async () => {
    const ff = new FileforgeClient({
      apiKey: process.env.FILEFORGE_API_KEY,
    });

    const file = await ff.pdf.generate(
      [
        await fileFromPath(__dirname + "/samples/index.html", "index.html", {
          type: "text/html",
        }),
      ],
      {},
    );

    expect(file).toBeInstanceOf(ReadableStream);
  });

  it("should decode json in generate", async () => {
    const ff = new FileforgeClient({
      apiKey: process.env.FILEFORGE_API_KEY,
    });

    const { url } = await ff.pdf.generate(
      [
        await fileFromPath(__dirname + "/samples/index.html", "index.html", {
          type: "text/html",
        }),
      ],
      {
        options: { host: true },
      },
    );

    expect(url).toBeDefined();
  });
});
