import { Gender } from './gender.enum';
import { Role } from "./role.enum";
import { DocumentReference, CollectionReference } from '@angular/fire/firestore';
import { User } from './user.interface';
import { BusinessEvent } from './business-event.interface';
import { InventoryItem } from './inventory-item.interface';
import { Note } from './note.interface';
import { Tag } from './tag.interface';

export interface BusinessUser {
    id: string; // Should match user ID
    
    role: Role;
    displayName: string;
    description?: string;
    email?: string;
    phoneNumber?: string;
    dob?: Date;
    gender?: Gender;

    //#region Foreign Keys - Collections or Documents
    user: DocumentReference<User>;
    tag?: DocumentReference<Tag>;
    events?: DocumentReference<BusinessEvent>[]; // Array of references to associated business events
    assignedInventory?: DocumentReference<InventoryItem>[]; // Array of references to inventory

    // Collections
    notes?: CollectionReference<Note>;

    //#endregion
    
}