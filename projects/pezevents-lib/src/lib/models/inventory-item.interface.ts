import { Base } from './base.interface';
import { DescriptiveInputField } from './descriptive-field.interface';
export interface InventoryItem extends Base {
    options: DescriptiveInputField[];
}