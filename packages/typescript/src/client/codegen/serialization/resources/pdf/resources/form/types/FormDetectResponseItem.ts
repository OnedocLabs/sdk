/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Fileforge from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { FormDetectResponseItemIsChecked } from "./FormDetectResponseItemIsChecked";
import { FormDetectResponseItemIsEditable } from "./FormDetectResponseItemIsEditable";
import { FormDetectResponseItemIsMutuallyExclusive } from "./FormDetectResponseItemIsMutuallyExclusive";
import { FormDetectResponseItemDefaultValue } from "./FormDetectResponseItemDefaultValue";

export const FormDetectResponseItem: core.serialization.Schema<
    serializers.pdf.FormDetectResponseItem.Raw,
    Fileforge.pdf.FormDetectResponseItem
> = core.serialization.undiscriminatedUnion([
    FormDetectResponseItemIsChecked,
    FormDetectResponseItemIsEditable,
    FormDetectResponseItemIsMutuallyExclusive,
    FormDetectResponseItemDefaultValue,
]);

export declare namespace FormDetectResponseItem {
    type Raw =
        | FormDetectResponseItemIsChecked.Raw
        | FormDetectResponseItemIsEditable.Raw
        | FormDetectResponseItemIsMutuallyExclusive.Raw
        | FormDetectResponseItemDefaultValue.Raw;
}
