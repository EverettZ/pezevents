import { Note } from './note.interface';
import { Role } from './role.enum';
import { DocumentReference, CollectionReference } from '@angular/fire/firestore';
import { Tag } from './tag.interface';
import { BusinessEvent } from './business-event.interface';
export interface InventoryItem  {
    id: string;

    displayName: string;
    description?: string;
    photoUrl?: string;
    location?: string;
    category?: string;
    order?: number;
    role?: Role;
    quantity: number;
    
    tag: DocumentReference<Tag>; // Array of references to business inventory tags
    uses?: DocumentReference<BusinessEvent>[]; // Array of references to business events
    notes: CollectionReference<Note>; // Collection of notes
}