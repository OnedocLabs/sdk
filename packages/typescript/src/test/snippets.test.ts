/**
 * @vitest-environment node
 */
import { beforeAll } from "vitest";
import { describe, it, expect } from "vitest";
import { FileforgeClient } from "@/client";
import { FormDetectResponseItem } from "@/client/codegen/api/resources/pdf/resources/form/types/FormDetectResponseItem";
import { FormFillRequestOptionsFieldsItemValue } from "@/client/codegen/api/resources/pdf/resources/form/types/FormFillRequestOptionsFieldsItemValue";
import * as fs from "node:fs";
import internal, { Readable } from "node:stream";
import { fileFromPath } from "formdata-node/file-from-path";
import { BadRequestError, UnauthorizedError } from "@/client/codegen/api";
import { pipeline } from "node:stream/promises";

const NODE_VERSION = parseInt(process.versions.node.split(".")[0]);

describe("node", () => {
  beforeAll(() => {
    if (!process.env.FILEFORGE_API_KEY) {
      throw new Error("FILEFORGE_API_KEY is not set");
    }
  });

  it("convert docx snippet should work", async () => {
    const ff = new FileforgeClient({
      apiKey: process.env.FILEFORGE_API_KEY,
    });

    try {
      const docxFile = fs.createReadStream(
        __dirname + "/samples/document-simple.docx",
      );
      const pdfStream = await ff.pdf.fromDocx(
        docxFile,
        {},
        {
          timeoutInSeconds: 30,
        },
      );

      pdfStream.pipe(fs.createWriteStream("./result_docx.pdf"));
      console.log("PDF conversion successful. Stream ready.");

      expect(pdfStream).toBeInstanceOf(Readable);
    } catch (error) {
      console.error("Error during PDF conversion:", error);
      throw error;
    }
  }, 30000);

  it.skipIf(NODE_VERSION < 20)("generate from HTML should work", async () => {
    const ff = new FileforgeClient({
      apiKey: process.env.FILEFORGE_API_KEY,
    });

    try {
      const pdf = await ff.pdf.generate(
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
        {
          timeoutInSeconds: 30,
        },
      );

      console.log(pdf.url);
      expect(pdf.url).toBeDefined();
    } catch (error) {
      console.error("Error during PDF generation:", error);
      throw error;
    }
  });

  it.skipIf(NODE_VERSION < 20)("merge PDFs should work", async () => {
    const ff = new FileforgeClient({
      apiKey: process.env.FILEFORGE_API_KEY,
    });

    try {
      const pdfFiles = [
        fs.createReadStream(__dirname + "/pdf1.pdf"),
        fs.createReadStream(__dirname + "/pdf2.pdf"),
      ];
      const mergedPdfStream = await ff.pdf.merge(
        pdfFiles,
        {
          options: {
            // Specify merge options if any
          },
        },
        {
          timeoutInSeconds: 60,
        },
      );
      mergedPdfStream.pipe(fs.createWriteStream("./result_merge.pdf"));
      console.log("PDF merge successful. Stream ready.");
      expect(mergedPdfStream).toBeInstanceOf(Readable);
    } catch (error) {
      console.error("Error during PDF merge:", error);
      throw error;
    }
  });

  it.skipIf(NODE_VERSION < 20)(
    "detect form fields in PDFs should work",
    async () => {
      const ff = new FileforgeClient({
        apiKey: process.env.FILEFORGE_API_KEY,
      });

      try {
        const resultObject = await ff.pdf.form.detect(
          new File(
            [fs.readFileSync(__dirname + "/samples/form.pdf")],
            "form.pdf",
            {
              type: "application/pdf",
            },
          ),
          { options: {} },
        );

        console.log(resultObject);
        expect(resultObject).toBeInstanceOf(Array<FormDetectResponseItem>);
      } catch (error) {
        console.error("Error during PDF form detect:", error);
        throw error;
      }
    },
  );

  it.skipIf(NODE_VERSION < 20)("mark fields in PDFs should work", async () => {
    const ff = new FileforgeClient({
      apiKey: process.env.FILEFORGE_API_KEY,
    });

    try {
      const pdfStream = await ff.pdf.form.mark(
        new File(
          [fs.readFileSync(__dirname + "/samples/form.pdf")],
          "form.pdf",
          {
            type: "application/pdf",
          },
        ),
        { options: {} },
      );

      pdfStream.pipe(fs.createWriteStream("./result_mark.pdf"));
      expect(pdfStream).toBeInstanceOf(Readable);
    } catch (error) {
      console.error("Error during PDF form mark:", error);
      throw error;
    }
  });

  it.skipIf(NODE_VERSION < 20)("fill fields in PDFs should work", async () => {
    const ff = new FileforgeClient({
      apiKey: process.env.FILEFORGE_API_KEY,
    });

    try {
      const formFillRequest = {
        options: {
          fields: [
            {
              name: "Producer Name",
              type: "PDFTextField",
              value: "Titouan Launay",
            } as FormFillRequestOptionsFieldsItemValue,
          ],
        },
      };
      const requestOptions = {
        timeoutInSeconds: 60,
        maxRetries: 3,
      };
      const filledPdfStream = await ff.pdf.form.fill(
        new File(
          [fs.readFileSync(__dirname + "/samples/form.pdf")],
          "form.pdf",
          {
            type: "application/pdf",
          },
        ),
        formFillRequest,
        requestOptions,
      );

      filledPdfStream.pipe(fs.createWriteStream("./result_filled.pdf"));
      expect(filledPdfStream).toBeInstanceOf(Readable);
      console.log("PDF form filling successful. Stream ready.");
    } catch (error) {
      console.error("Error during PDF form filling:", error);
    }
  });

  it.skipIf(NODE_VERSION < 20)("Split", async () => {
    const ff = new FileforgeClient({
      apiKey: process.env.FILEFORGE_API_KEY,
    });

    try {
      const splitRequest = {
        options: {
          splitPage: 1,
        },
      };
      const requestOptions = {
        timeoutInSeconds: 60,
        maxRetries: 3,
      };
      const splitArchiveStream = await ff.pdf.split(
        new File(
          [fs.readFileSync(__dirname + "/samples/form.pdf")],
          "form.pdf",
          {
            type: "application/pdf",
          },
        ),
        splitRequest,
        requestOptions,
      );

      await pipeline(
        splitArchiveStream,
        fs.createWriteStream("./result_split.zip"),
      );
      expect(splitArchiveStream).toBeInstanceOf(Readable);
      console.log("Split successful. Zip Stream ready.");
    } catch (error) {
      console.error("Error during PDF splitting:", error);
    }
  });

  it.skipIf(NODE_VERSION < 20)("Extract", async () => {
    const ff = new FileforgeClient({
      apiKey: process.env.FILEFORGE_API_KEY,
    });

    try {
      const extractRequest = {
        options: {
          start: 1,
          end: 1,
        },
      };
      const requestOptions = {
        timeoutInSeconds: 60,
        maxRetries: 3,
      };
      const extractStream = await ff.pdf.extract(
        new File(
          [fs.readFileSync(__dirname + "/samples/form.pdf")],
          "form.pdf",
          {
            type: "application/pdf",
          },
        ),
        extractRequest,
        requestOptions,
      );

      await pipeline(
        extractStream,
        fs.createWriteStream("./result_extract.pdf"),
      );
      expect(extractStream).toBeInstanceOf(Readable);
      console.log("Extraction successful.Stream ready.");
    } catch (error) {
      console.error("Error during PDF extraction:", error);
    }
  });

  it.skipIf(NODE_VERSION < 20)("Insert PDFs should work", async () => {
    const ff = new FileforgeClient({
      apiKey: process.env.FILEFORGE_API_KEY,
    });

    try {
      const pdfFiles = [
        fs.createReadStream(__dirname + "/pdf1.pdf"),
        fs.createReadStream(__dirname + "/pdf2.pdf"),
      ];
      const insertPDFStream = await ff.pdf.insert(
        pdfFiles,
        {
          options: {
            // Specify insert options if any
            insertPage: 1,
          },
        },
        {
          timeoutInSeconds: 60,
        },
      );
      insertPDFStream.pipe(fs.createWriteStream("./result_insert.pdf"));
      console.log("PDF inserted successfully. Stream ready.");
      expect(insertPDFStream).toBeInstanceOf(Readable);
    } catch (error) {
      console.error("Error during PDF insertion:", error);
      throw error;
    }
  });
});
