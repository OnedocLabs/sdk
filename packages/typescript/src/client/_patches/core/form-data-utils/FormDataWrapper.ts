import { RUNTIME } from "../runtime";
import { Blob } from "formdata-node";

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

  public async needsEncoder() {
    if (RUNTIME.type !== "node") {
      return false;
    }

    try {
      return (await import("node:stream")).Readable !== undefined;
    } catch (e) {
      return false;
    }
  }

  /**
   * @returns the multipart form data request
   */
  public async getBody(): Promise<any> {
    if (!(await this.needsEncoder())) {
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
    if (!(await this.needsEncoder())) {
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
      this.fd = new (await import("formdata-node")).FormData();
    }

    if (name === "options" && typeof value === "string") {
      this.fd.append(
        "options",
        new Blob([value], { type: "application/json" }),
      );

      return;
    }

    try {
      const Readable = (await import("stream")).Readable;
      if (RUNTIME.type === "node" && value instanceof Readable) {
        const { stream, mime } = await (
          await import("stream-mime-type")
        ).getMimeType(value);

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
    } catch (e) {}

    this.fd.append(name, value);
  }

  public getRequest(): FormDataRequestBody {
    return new FormDataRequestBody(this.fd);
  }
}
