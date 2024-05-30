/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Fileforge from "../../../../../../api/index";
import * as core from "../../../../../../core";

export const FormFillRequestOptionsFieldsItemChecked: core.serialization.ObjectSchema<
    serializers.pdf.FormFillRequestOptionsFieldsItemChecked.Raw,
    Fileforge.pdf.FormFillRequestOptionsFieldsItemChecked
> = core.serialization.object({
    type: core.serialization.stringLiteral("PDFCheckBox"),
    checked: core.serialization.boolean(),
});

export declare namespace FormFillRequestOptionsFieldsItemChecked {
    interface Raw {
        type: "PDFCheckBox";
        checked: boolean;
    }
}
