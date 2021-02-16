import { Note } from "./note.interface";
import { Role } from "./role.enum";

export interface Base {
    id?: string;
    displayName: string;
    notes?: Note[];
    role?: Role;
    email?: string;
    phoneNumber?: string;
    photoUrl?: string;
    created?: Date;
    modified?: Date;
    description?: string;
}