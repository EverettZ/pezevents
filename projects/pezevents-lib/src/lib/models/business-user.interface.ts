import { BusinessEvent } from "./business-event.interface";
import { Role } from "./role.enum";

export interface BusinessUser {
    id: string; // Reference to Users collection
    role: Role;
    displayName: string;
    description?: string;
    email: string;
    phoneNumber: string;
    dob: Date;
    events: string[]; // References to a businesses events
}