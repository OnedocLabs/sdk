import { getMimeType } from "stream-mime-type";
import { RUNTIME } from "../runtime";

interface CrossPlatformFormData {
  append(key: string, value: any): void;
}

class FormDataRequestBody {
  private fd: any;
  private encoder: any;

  constructor(fd: any) {
    this.fd = fd;
  }

  async setup(): Promise<void> {
    if (this.encoder == null && RUNTIME.type === "node") {
      this.encoder = new (await import("form-data-encoder")).FormDataEncoder(
        this.fd,
      );
    }
  }

  /**
   * @returns the multipart form data request
   */
  public async getBody(): Promise<any> {
    if (RUNTIME.type !== "node") {
      return this.fd;
    } else {
      if (this.encoder == null) {
        await this.setup();
      }
      return (await import("node:stream")).Readable.from(this.encoder);
    }
  }

  /**
   * @returns headers that need to be added to the multipart form data request
   */
  public async getHeaders(): Promise<Record<string, string>> {
    if (RUNTIME.type !== "node") {
      return {};
    } else {
      if (this.encoder == null) {
        await this.setup();
      }
      return {
        ...this.encoder.headers,
        "Content-Length": this.encoder.length,
      };
    }
  }
}

/**
 * FormDataWrapper is a utility to make form data
 * requests across both Browser and Node.js runtimes.
 */
export class FormDataWrapper {
  private fd: CrossPlatformFormData | undefined;

  public async append(name: string, value: any): Promise<void> {
    if (this.fd == null) {
      if (RUNTIME.type === "node") {
        this.fd = new (await import("formdata-node")).FormData();
      } else {
        this.fd = new (await import("form-data")).default();
      }
    }

    if (name === "options" && typeof value === "string") {
      this.fd.append(
        "options",
        new Blob([value], { type: "application/json" }),
      );

      return;
    }

    if (
      RUNTIME.type === "node" &&
      value instanceof (await import("node:stream")).Readable
    ) {
      const { stream, mime } = await getMimeType(value);

      // If there is no filename, generate a random one. This is especially useful for multiple file operations that don't rely on filenames.
      let fileName = (
        (Math.random() + 1).toString(36) + "00000000000000000"
      ).slice(2, 7);

      this.fd.append(name, {
        type: mime,
        name: fileName,
        [Symbol.toStringTag]: "File",
        stream() {
          return stream;
        },
      });

      return;
    }

    this.fd.append(name, value);
  }

  public getRequest(): FormDataRequestBody {
    return new FormDataRequestBody(this.fd);
  }
}
