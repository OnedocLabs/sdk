/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Fileforge from "../../../../api/index";
import * as core from "../../../../core";

export const PdfExtractRequestOptions: core.serialization.ObjectSchema<
    serializers.PdfExtractRequestOptions.Raw,
    Fileforge.PdfExtractRequestOptions
> = core.serialization.object({
    start: core.serialization.number(),
    end: core.serialization.number(),
});

export declare namespace PdfExtractRequestOptions {
    interface Raw {
        start: number;
        end: number;
    }
}
