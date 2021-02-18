import { BusinessUser } from './business-user.interface';
import { Note } from './note.interface';
import { InventoryItem } from './inventory-item.interface';
import { SezzionNotification } from './sezzion-notification.interface';
import { BusinessEvent } from './business-event.interface';
export interface Business {
    id: string;
    uniqueName: string;
    displayName: string;
    photoUrl?: string;
    created: Date;
    owner: string;
    phoneNumber: string;
    description: string;
    
    // Collections
    notes: Note[];
    inventory: InventoryItem[];
    // transactions: Transaction[];
    notifications: SezzionNotification[];
    users: BusinessUser[];
    events: BusinessEvent[];
}
