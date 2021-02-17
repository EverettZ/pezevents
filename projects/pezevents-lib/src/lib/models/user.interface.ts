import { Gender } from './gender.enum';
import { Address } from './address.interface';
import { SezzionNotification } from './sezzion-notification.interface';
export interface User  {
    id: string;
    photoUrl?: string | null;
    created: Date;
    email: string;
    phoneNumber: string;
    lastSignIn: Date;
    providerId?: string;
    businesses: string[]; // References to bussiness/{businessId}
    transactions: string[]; // References to all bussiness/transactions/{businessId}
    notifications: SezzionNotification[];
    displayName: string;
    address: Address;
    dob: Date;
    gender: Gender;

    isAnonymous: boolean;
    emailVerified: boolean;
}