export interface User  {
    createdAt?: string;
    lastLoginAt?: string;
    isAnonymous?: boolean;
    emailVerified?: boolean;
    displayName?: string | null;
    email?: string | null;
    phoneNumber?: string | null;
    photoURL?: string | null;
    providerId?: string;
    uid?: string;
}