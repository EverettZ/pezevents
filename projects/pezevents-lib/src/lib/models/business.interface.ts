import { Transaction } from './transaction.interface';
import { BusinessUser } from './business-user.interface';
import { Note } from './note.interface';
import { InventoryItem } from './inventory-item.interface';
import { SezzionNotification } from './sezzion-notification.interface';
import { BusinessEvent } from './business-event.interface';
import { CollectionReference, DocumentReference } from '@angular/fire/firestore'
import { Address } from './address.interface';
import { Tag } from './tag.interface';
export interface Business extends Address {
    id: string;
    
    uniqueName: string;
    displayName: string;
    photoUrl?: string;
    created: Date;
    owner: string; // Owner ID
    email: string;
    phoneNumber: string;
    description: string;

    //#region Foreign Keys - Collections or Documents
    ownerRef: DocumentReference<BusinessUser>;

    // Collections
    tags?: CollectionReference<Tag>; // Array of references to business inventory tags
    notes?: CollectionReference<Note>;
    inventory?: CollectionReference<InventoryItem>;
    transactions?: CollectionReference<Transaction>;
    notifications?: CollectionReference<SezzionNotification>;
    users?: CollectionReference<BusinessUser>;
    events?: CollectionReference<BusinessEvent>;
    //#endregion

}