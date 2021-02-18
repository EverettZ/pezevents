import { Note } from './note.interface';
import { Role } from './role.enum';
export interface InventoryItem  {
    id: string;
    displayName: string;
    photoUrl?: string;
    description: string;
    location: string;
    uses: string[]; // References to business events
    label: string;
    category?: string;
    order: number;
    role: Role;
    quantity: number;
    notes: Note[];
}