import { Readable } from "node:stream";
import { FileforgeClient as InternalClient } from "./codegen";
export { Fileforge } from "./codegen";
import { Pdf as CodegenPDF } from "./codegen/api/resources/pdf/client/Client";
import { File } from "formdata-node";

export class Pdf extends CodegenPDF {
  public async generate<Options extends Parameters<CodegenPDF["generate"]>[1]>(
    files: Parameters<CodegenPDF["generate"]>[0] | string,
    options: Options,
    request?: Parameters<CodegenPDF["generate"]>[2],
  ): Promise<
    Options extends { options: { host: true } }
      ? {
          url: string;
        }
      : Awaited<ReturnType<CodegenPDF["generate"]>>
  > {
    let parsedFiles = files;

    if (typeof files === "string") {
      parsedFiles = [
        new File([files], "index.html", {
          type: "text/html",
        }),
      ];
    }

    const params = [
      parsedFiles as Parameters<CodegenPDF["generate"]>[0],
      options,
      request,
    ] as const;

    const responseStream = (await super.generate(...params)) as
      | Readable
      | ReadableStream<Uint8Array>;

    switch (options.options?.host) {
      case true:
        if (responseStream instanceof ReadableStream) {
          // @ts-expect-error
          return (await new Response(responseStream).json()) as {
            url: string;
          };
        } else {
          // @ts-expect-error
          return JSON.parse(Buffer.concat(await responseStream.toArray())) as {
            url: string;
          };
        }
      default:
        // @ts-expect-error
        return responseStream as Awaited<ReturnType<CodegenPDF["generate"]>>;
    }
  }
}

export class FileforgeClient extends InternalClient {
  public get pdf(): Pdf {
    // @ts-expect-error
    return (this._pdf ??= new Pdf(this._options));
  }
}
