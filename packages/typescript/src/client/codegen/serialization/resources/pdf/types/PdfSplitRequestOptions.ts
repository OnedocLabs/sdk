/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Fileforge from "../../../../api/index";
import * as core from "../../../../core";

export const PdfSplitRequestOptions: core.serialization.ObjectSchema<
    serializers.PdfSplitRequestOptions.Raw,
    Fileforge.PdfSplitRequestOptions
> = core.serialization.object({
    splitPage: core.serialization.number(),
});

export declare namespace PdfSplitRequestOptions {
    interface Raw {
        splitPage: number;
    }
}
