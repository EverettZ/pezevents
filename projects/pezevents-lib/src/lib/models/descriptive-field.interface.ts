import { DescriptiveFieldType } from "./descriptive-field-type.enum";
import { Note } from "./note.interface";

export interface DescriptiveInputField {
    type: DescriptiveFieldType;
    value: string;
    label: string;
    priority: number;
    notes?: Note[];
}