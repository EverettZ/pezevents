import { InventoryItem } from './inventory-item.interface';
import { Note } from "./note.interface";
import { User } from "./user.interface";

export interface BusinessEvent {
    organizers: User[];
    attendees: User[];
    inventory: InventoryItem[];
    notes?: Note[];
    photoUrl?: string;
    created?: Date;
    modified?: Date;
    description?: string;
}