import { Tag } from './tag.interface';
import { Role } from './role.enum';
import { DocumentReference } from '@angular/fire/firestore';
export interface Note {
    id: string;
    label: string;
    value: string;
    createdBy: string; // reference to a BusinessUser
    created: Date;
    modified: Date; // Initial value will equal created date
    order: number;
    role: Role; // Controls access level/who can see this
    tag?: DocumentReference<Tag>;
}