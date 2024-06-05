import { describe, it, expect } from "vitest";
import { FileforgeClient } from "@/client";

// @ts-ignore
const apiKey = __FILEFORGE_API_KEY__ as string;

describe("browser", () => {
  it("should work", () => {
    // Ensure that File is not available in the global scope
    expect(File).toBeDefined();

    expect(
      new FileforgeClient({
        apiKey,
      }),
    ).toBeInstanceOf(FileforgeClient);
  });

  it("should generate a doc", async () => {
    const ff = new FileforgeClient({
      apiKey,
    });

    const doc = await ff.pdf.generate("<h1>Hello, World!</h1>", {});

    expect(doc).toBeInstanceOf(ReadableStream);
  });

  it("should get a generated doc URL", async () => {
    const ff = new FileforgeClient({
      apiKey,
    });

    const { url } = await ff.pdf.generate("<h1>Hello, World!</h1>", {
      options: {
        host: true,
      },
    });

    expect(url).toBeDefined();
  });
});
