/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Fileforge from "../../../../../../api/index";
import * as core from "../../../../../../core";

export const FormFillRequestOptionsFieldsItemValue: core.serialization.ObjectSchema<
    serializers.pdf.FormFillRequestOptionsFieldsItemValue.Raw,
    Fileforge.pdf.FormFillRequestOptionsFieldsItemValue
> = core.serialization.object({
    type: core.serialization.stringLiteral("PDFTextField"),
    value: core.serialization.string(),
});

export declare namespace FormFillRequestOptionsFieldsItemValue {
    interface Raw {
        type: "PDFTextField";
        value: string;
    }
}
