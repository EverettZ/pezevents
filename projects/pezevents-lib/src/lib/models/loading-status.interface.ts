export enum ViewStatus {
    Initial = 'INITIAL',
    Loading = 'LOADING',
    Success = 'SUCCESS',
    Failure = 'FAILURE',
}

export enum LoadingType {
    SignIn = 'Signing in',
    User = 'Loading user',
    SignOut = 'Sign out',
    Reset = 'Password reset',
    Register = 'Register account',
}

export interface LoadingStatus {
    viewStatus: ViewStatus;
    errorMessage?: string;
    successMessage?: string;
    loadingType?: LoadingType;
}