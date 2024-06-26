/**
 * @vitest-environment node
 */

import { describe, it, expect } from "vitest";
import { FileforgeClient } from "@/client";
import * as fs from "node:fs";
import internal, { Readable } from "node:stream";
import { fileFromPath } from "formdata-node/file-from-path";
import { BadRequestError, UnauthorizedError } from "@/client/codegen/api";

const NODE_VERSION = parseInt(process.versions.node.split(".")[0]);

describe("node", () => {
  it("should work with staging", async () => {
    const ff = new FileforgeClient({
      apiKey: process.env.FILEFORGE_API_KEY,
      environment: "https://api.staging.Fileforge.com",
    });

    await ff.getStatus();
  });

  it("should work with prod", async () => {
    const ff = new FileforgeClient({
      apiKey: process.env.FILEFORGE_API_KEY,
    });

    await ff.getStatus();
  });

  it("should throw verbose errors", async () => {
    const ff = new FileforgeClient({
      apiKey: "invalid",
    });

    try {
      await ff.pdf.generate(
        [
          await fileFromPath(__dirname + "/samples/index.html", "index.html", {
            type: "text/html",
          }),
        ],
        {
          options: { host: true },
        },
      );
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedError);
    }

    const authentifiedFf = new FileforgeClient({
      apiKey: process.env.FILEFORGE_API_KEY,
    });

    try {
      await authentifiedFf.pdf.generate(
        [
          await fileFromPath(__dirname + "/samples/index.html", "doc.html", {
            type: "text/html",
          }),
        ],
        {
          options: { host: true },
        },
      );
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestError);
    }
  });

  it.skipIf(NODE_VERSION >= 20)("should work with node < 20", () => {
    // Ensure that File is not available in the global scope
    expect(global.File).toBeUndefined();

    expect(
      new FileforgeClient({
        apiKey: process.env.FILEFORGE_API_KEY,
      }),
    ).toBeInstanceOf(FileforgeClient);
  });

  it.skipIf(NODE_VERSION < 20)("should work with node >= 20", () => {
    // Ensure that File is available in the global scope
    expect(global.File).toBeDefined();

    expect(
      new FileforgeClient({
        apiKey: process.env.FILEFORGE_API_KEY,
      }),
    ).toBeInstanceOf(FileforgeClient);
  });

  it.skipIf(NODE_VERSION < 20)("should take File", async () => {
    const ff = new FileforgeClient({
      apiKey: process.env.FILEFORGE_API_KEY,
    });

    const response = await ff.pdf.form.mark(
      new File([fs.readFileSync(__dirname + "/samples/form.pdf")], "form.pdf", {
        type: "application/pdf",
      }),
      { options: {} },
    );

    expect(response).toBeInstanceOf(internal.Readable);
  });

  it("should take File polyfill", async () => {
    // Use a polyfill for File. This allows the user to pass a file name
    const { File } = await import("@web-std/file");

    const ff = new FileforgeClient({
      apiKey: process.env.FILEFORGE_API_KEY,
    });

    await ff.pdf.form.mark(
      new File(
        [fs.readFileSync(__dirname + "/samples/form.pdf")],
        "form-polyfilled.pdf",
        {
          type: "application/pdf",
        },
      ),
      { options: {} },
    );
  });

  it("should take fs.createReadStream", async () => {
    const ff = new FileforgeClient({
      apiKey: process.env.FILEFORGE_API_KEY,
    });

    await ff.pdf.form.mark(
      fs.createReadStream(__dirname + "/samples/form.pdf"),
      {},
    );
  });

  it("should take multiple fs.createReadStream", async () => {
    const ff = new FileforgeClient({
      apiKey: process.env.FILEFORGE_API_KEY,
    });

    await ff.pdf.merge(
      [
        fs.createReadStream(__dirname + "/samples/form.pdf"),
        fs.createReadStream(__dirname + "/samples/form.pdf"),
      ],
      {},
    );
  });

  it.skipIf(NODE_VERSION < 20)("should work with generation", async () => {
    const ff = new FileforgeClient({
      apiKey: process.env.FILEFORGE_API_KEY,
    });

    const document = await ff.pdf.generate(
      [
        new File(
          ["<!doctype html><html><body><h1>Hello world</h1></body></html>"],
          "index.html",
          {
            type: "text/html",
          },
        ),
      ],
      {
        options: {
          host: true,
        },
      },
    );

    expect(document.url).toBeDefined();
  });

  it.skipIf(NODE_VERSION < 20)(
    "should work with generation without host",
    async () => {
      const ff = new FileforgeClient({
        apiKey: process.env.FILEFORGE_API_KEY,
      });

      const document = await ff.pdf.generate(
        [
          new File(
            ["<!doctype html><html><body><h1>Hello world</h1></body></html>"],
            "index.html",
            {
              type: "text/html",
            },
          ),
        ],
        { options: {} },
      );

      expect(document).toBeDefined();
    },
  );

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

    expect(file).toBeInstanceOf(Readable);
  });

  it("should create index from string", async () => {
    const ff = new FileforgeClient({
      apiKey: process.env.FILEFORGE_API_KEY,
    });

    const file = await ff.pdf.generate(
      "<!doctype text><html><body><h1>Hello world</h1></body></html>",
      {},
    );

    expect(file).toBeInstanceOf(Readable);
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
