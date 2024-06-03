import { FileforgeClient } from "../../../dist/cjs/index";
import { describe, it, expect } from "vitest";
import * as fs from "node:fs";

const NODE_VERSION = parseInt(process.versions.node.split(".")[0]);

describe("FileforgeClient", () => {
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

    expect(response).toBeDefined();
  });

  it("should take fs.createReadStream", async () => {
    const ff = new FileforgeClient({
      apiKey: process.env.FILEFORGE_API_KEY,
    });

    const response = await ff.pdf.form.mark(
      fs.createReadStream(__dirname + "/samples/form.pdf"),
      {},
    );

    expect(response).toBeDefined();
  });
});
