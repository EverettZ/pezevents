import { DocumentReference } from '@angular/fire/firestore';
import { User } from './user.interface';
import { Business } from './business.interface';
export interface Transaction {
    id: string; // Transaction ID (matches document ID)
    
    transactionStatusCode: number;
    transactionTypeCode: number;
    serviceId: any;
    paymentMethodCode: number;
    dateOfTransaction: Date;
    amount: number;
    
    payer: DocumentReference<User>;
    receiver: DocumentReference<User>;
    business: DocumentReference<Business>;
}