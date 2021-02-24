import { Role } from './role.enum';
import { Address } from './address.interface';
import { BusinessUser } from './business-user.interface';
import { InventoryItem } from './inventory-item.interface';
import { Note } from "./note.interface";
import { CollectionReference, DocumentReference } from '@angular/fire/firestore';
import { Transaction } from './transaction.interface';
import { Tag } from './tag.interface';

export interface BusinessEvent extends Address{
    id: string; // Event ID. Should match document ID.

    costPerCustomer: number;
    photoUrl?: string;
    created: Date;
    modified: Date;
    label: string;
    description: string;
    starts: Date;
    ends: Date;
    location?: string;
    completed: boolean;
    role: Role; // Controls access level for who sees this event. Should default to all (customer).

    tag?: DocumentReference<Tag>;
    users: CollectionReference<BusinessUser>; // user role used to dicate between staff and customer
    inventory: CollectionReference<InventoryItem>; // inventory to be used during an event
    notes?: CollectionReference<Note>;
    transactions: DocumentReference<Transaction>[];
}