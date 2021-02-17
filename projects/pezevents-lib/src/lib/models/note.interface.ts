import { Role } from './role.enum';
export interface Note {
    id: string;
    label: string;
    value: string;
    createdBy: string; // reference to a BusinessUser
    created: Date;
    modified: Date; // Initial value will equal created date
    order: number;
    role: Role; // Controls access level/who can see this
}