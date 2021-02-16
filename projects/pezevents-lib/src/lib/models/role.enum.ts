export enum Role {
    Owner = 'Owner', // Read/Write access on everything public or private.
    Admin = 'Admin', // Read access on everything public or private. Write access on non business account setup value.
    Organizer = 'Organizer', // Read access on everything public. Write access on event creation.
    User = 'User' // Read access on everything public. Write access on event subscription only.
}