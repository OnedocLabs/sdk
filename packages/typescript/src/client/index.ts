import { FileforgeClient as InternalClient } from "./codegen";
export { Fileforge } from "./codegen";
import { Pdf as CodegenPDF } from "./codegen/api/resources/pdf/client/Client";

export class Pdf extends CodegenPDF {
  public async generate<Options extends Parameters<CodegenPDF["generate"]>[1]>(
    files: Parameters<CodegenPDF["generate"]>[0],
    options: Options,
    request?: Parameters<CodegenPDF["generate"]>[2],
  ): Promise<
    Options extends { options: { host: true } }
      ? {
          url: string;
        }
      : Awaited<ReturnType<CodegenPDF["generate"]>>
  > {
    const params = [files, options, request] as const;

    const responseStream = await super.generate(...params);
    switch (options.options?.host) {
      case true:
        const buffer = Buffer.concat(await responseStream.toArray());

        // @ts-expect-error
        return JSON.parse(buffer.toString()) as { url: string };
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
