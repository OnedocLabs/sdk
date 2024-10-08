/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Fileforge from "../../../../api/index";
import * as core from "../../../../core";

export const PdfGenerateRequestOptions: core.serialization.ObjectSchema<
    serializers.PdfGenerateRequestOptions.Raw,
    Fileforge.PdfGenerateRequestOptions
> = core.serialization.object({
    test: core.serialization.boolean().optional(),
    host: core.serialization.boolean().optional(),
    expiresAt: core.serialization.date().optional(),
    fileName: core.serialization.string().optional(),
    allowViewing: core.serialization.boolean().optional(),
});

export declare namespace PdfGenerateRequestOptions {
    interface Raw {
        test?: boolean | null;
        host?: boolean | null;
        expiresAt?: string | null;
        fileName?: string | null;
        allowViewing?: boolean | null;
    }
}
