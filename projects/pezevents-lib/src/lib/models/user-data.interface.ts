import { UserBusiness } from './user-business.interface';

export interface UserData {
    // Account details like payment data, records, etc...
    uid: string;
    businesses?: UserBusiness[]
}