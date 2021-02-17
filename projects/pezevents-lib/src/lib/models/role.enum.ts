/**
 * Role string enum
 * Owner: Read/Write access on everything business related, for any Role value. Highest access to allow for business renaming, account deletation, transactional data, staff additions.
 *  - Has access to everything an admin, staff, and customer has access to.
 * Admin: Read/Write access on everything business related, for any Role value. Besides renaming the business, deleting it, business description notes, and financials.
 *  - Has access to everything a staff and customer has access to.
 * Staff: Read/write access for their assigned events.
 *  - Has access to everything a customer has access to.
 * Customer: Read access on only their assigned access. Write access for scheduling an event.
 */
export enum Role {
    Owner = 'Owner',
    Admin = 'Admin',
    Staff = 'Staff',
    Customer = 'Customer'
}
