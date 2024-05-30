/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Fileforge from "../../../../../../api/index";
import * as core from "../../../../../../core";

export const FormDetectResponseItemIsEditableType: core.serialization.Schema<
    serializers.pdf.FormDetectResponseItemIsEditableType.Raw,
    Fileforge.pdf.FormDetectResponseItemIsEditableType
> = core.serialization.enum_(["PDFDropdown", "PDFOptionList"]);

export declare namespace FormDetectResponseItemIsEditableType {
    type Raw = "PDFDropdown" | "PDFOptionList";
}
