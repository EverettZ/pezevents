import { Role } from './role.enum';
import { Address } from './address.interface';
import { BusinessUser } from './business-user.interface';
import { InventoryItem } from './inventory-item.interface';
import { Note } from "./note.interface";
import { User } from "./user.interface";

export interface BusinessEvent {
    users: BusinessUser[]; // user role used to dicate between staff and customer
    inventory: InventoryItem[]; // inventory to be used during an event
    notes?: Note[];
    photoUrl?: string;
    created: Date;
    modified: Date;
    label: string;
    description: string;
    starts: Date;
    ends: Date;
    address?: Address;
    location: string;
    role: Role; // Controls access level for who sees this event. Should default to all (customer).
}