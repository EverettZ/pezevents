import { createAction, props } from '@ngrx/store';
import * as auth from "../reducers/auth.reducer";
import { User, LoadingStatus } from '@pezetter/pezevents-lib';
// #region - loadAuths actions
// Actions used to load user information from AngularFirebaseAuth
// loadAuths - load user information
export const loadAuths = createAction(
  '[Auth] Load Auths'
);

// authenticated
export const authenticated = createAction(
  '[Auth] Authenticated',
  props<{ user: User }>()
);

// notAuthenticated
export const notAuthenticated = createAction(
  '[Auth] Not Authenticated'
);

// authError
export const authError = createAction(
  '[Auth] Auth Error',
  props<{ errorMessage: string }>()
);
//#endregion

//#region - signIn/signOut actions
// signIn - Sign into account
export const signIn = createAction(
  '[Auth] Sign in',
  props<{ email: string, password: string }>()
);

export const googleSignIn = createAction(
  '[Auth] Google sign in'
);

// signOut - Sign out of account
export const signOut = createAction(
  '[Auth] Sign out'
);
export const signOutSuccess = createAction(
  '[Auth] Sign out Success'
);
//#endregion

// #region - reset password actions
// reset -  Password reset
export const reset = createAction(
  '[Auth] Reset password',
  props<{ email: string }>()
);
export const resetSuccess = createAction(
  '[Auth] Reset password Success',
  props<{ email: string }>()
);
export const resetFailure = createAction(
  '[Auth] Reset password Failure',
  props<{ errorMessage: string }>()
);
//#endregion

//#region - register account actions
// register -  Signup for account
export const register = createAction(
  '[Auth] Register account',
  props<{ email: string, password: string }>()
);
export const registerSuccess = createAction(
  '[Auth] Register account Success',
  props<{ loadingStatus: LoadingStatus, id: string }>()
);
export const registerFailure = createAction(
  '[Auth] Register account Failure',
  props<{ errorMessage: string }>()
);
//#endregion

//#region - loadUserData
export const loadUserData = createAction(
  '[Auth] Load user data',
  props<{ id: string }>()
);
export const loadUserDataSuccess = createAction(
  '[Auth] Load user data Success',
  props<{ userData: User}>()
);
export const loadUserDataFailure = createAction(
  '[Auth] Load user data Failure',
  props<{ errorMessage: string }>()
);
//#endregion