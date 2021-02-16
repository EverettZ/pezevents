import { Role } from './role.enum';
import { InventoryItem } from './inventory-item.interface';
import { Base } from './base.interface';
export interface Business extends Base {
    owner: string;
    users: { id: string, role: Role, ref: string }[];
    inventory: InventoryItem[];
    invetoryTags: string[];
}
