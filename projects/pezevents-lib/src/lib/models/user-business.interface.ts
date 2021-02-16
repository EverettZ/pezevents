import { Role } from "./role.enum";

export interface UserBusiness {
    id: string;
    description?: string;
    displayName: string;
    role: Role;
}