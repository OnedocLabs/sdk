/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Fileforge from "../../../../../index";

export interface FormFillRequestOptionsFieldsItemTwo {
    /** Name of the field to fill. This must match an exact name from the PDF document. To detect all fields, use the /pdf/form/fields endpoint, or use the /pdf/form/mark endpoint to get an annotated PDF with each detected field. */
    name: string;
    type: Fileforge.pdf.FormFillRequestOptionsFieldsItemTwoType;
    selected: string[];
}
