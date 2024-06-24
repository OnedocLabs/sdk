/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Fileforge from "../../../../../../api/index";
import * as core from "../../../../../../core";

export const FormDetectResponseItemType: core.serialization.ObjectSchema<
    serializers.pdf.FormDetectResponseItemType.Raw,
    Fileforge.pdf.FormDetectResponseItemType
> = core.serialization.object({
    type: core.serialization.stringLiteral("PDFSignature"),
    defaultValue: core.serialization.string().optional(),
});

export declare namespace FormDetectResponseItemType {
    interface Raw {
        type: "PDFSignature";
        defaultValue?: string | null;
    }
}
