import { Gender } from './gender.enum';
import { Address } from './address.interface';
import { SezzionNotification } from './sezzion-notification.interface';
import { DocumentReference, CollectionReference } from '@angular/fire/firestore';
import { Business } from './business.interface';
import { Transaction } from './transaction.interface';
export interface User extends Address  {
    id: string;
    photoUrl?: string | null;
    created: Date;
    email: string;
    phoneNumber?: string;
    lastSignIn: Date;
    providerId?: string;
    displayName: string;
    dob: Date;
    gender: Gender;
    
    isAnonymous: boolean;
    emailVerified: boolean;
    
    transactions: DocumentReference<Transaction>[]; // References to all bussiness/transactions/{businessId}
    notifications: CollectionReference<SezzionNotification>;
    businesses: DocumentReference<Business>[]; // References to bussiness/{businessId}
}