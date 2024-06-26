/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Fileforge from "../../../../api/index";
import * as core from "../../../../core";

export const PdfFromDocxRequestOptions: core.serialization.ObjectSchema<
    serializers.PdfFromDocxRequestOptions.Raw,
    Fileforge.PdfFromDocxRequestOptions
> = core.serialization.object({
    keepOriginalStyles: core.serialization.boolean().optional(),
    templateLiterals: core.serialization.record(core.serialization.string(), core.serialization.string()).optional(),
});

export declare namespace PdfFromDocxRequestOptions {
    interface Raw {
        keepOriginalStyles?: boolean | null;
        templateLiterals?: Record<string, string> | null;
    }
}
