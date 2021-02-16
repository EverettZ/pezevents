import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { LoadingStatus, ViewStatus, LoadingType } from '@pezetter/pezevents-lib'
import { User } from '@pezetter/pezevents-lib'

export const authFeatureKey = 'auth';

export interface State {
  user?: User;
  loadingStatus: LoadingStatus;
}

export const loadingStatus: LoadingStatus = {
  viewStatus: ViewStatus.Initial,
  loadingType: undefined
}

export const initialState: State = {
  user: undefined,
  loadingStatus: {
    viewStatus: ViewStatus.Initial
  }
};


export const reducer = createReducer(
  initialState,

  on(AuthActions.authenticated, (state, { user }) => ({
    ...state,
    loadingStatus: {
      viewStatus: ViewStatus.Success,
      loadingType: LoadingType.User
    },
    user
  })),
  on(AuthActions.notAuthenticated, (state, action) => (initialState)),
  on(AuthActions.authError, (state, { errorMessage }) => ({
    ...initialState,
    loadingStatus: {
      errorMessage,
      viewStatus: ViewStatus.Failure
    }
  })),
  on(AuthActions.loadAuths, (state, action) => ({
    ...state,
    loadingStatus: {
      viewStatus: ViewStatus.Loading,
      loadingType: LoadingType.User
    }
  })),

  on(AuthActions.signIn, (state, action) => ({
    loadingStatus: {
      viewStatus: ViewStatus.Loading,
      loadingType: LoadingType.SignIn
    }
  })),
  on(AuthActions.googleSignIn, (state, action) => ({
    loadingStatus: {
      viewStatus: ViewStatus.Loading,
      loadingType: LoadingType.SignIn
    }
  })),

  on(AuthActions.signOut, (state, action) => ({
    user: undefined,
    loadingStatus: {
      viewStatus: ViewStatus.Loading,
      loadingType: LoadingType.SignOut
    }
  })),
  on(AuthActions.signOutSuccess, (state, action) => (initialState)),

  on(AuthActions.reset, (state, action) => ({
    ...state,
    loadingStatus: {
      viewStatus: ViewStatus.Loading,
      loadingType: LoadingType.Reset
    }
  })),
  on(AuthActions.resetSuccess, (state, action) => ({
    ...state,
    loadingStatus: {
      viewStatus: ViewStatus.Failure,
      errorMessage: undefined,
      successMessage: "Password reset email sent to the given email.",
      loadingType: LoadingType.Reset
    }
  })),
  on(AuthActions.resetFailure, (state, action) => ({
    ...state,
    loadingStatus: {
      viewStatus: ViewStatus.Failure,
      errorMessage: action.errorMessage,
      successMessage: undefined,
      loadingType: LoadingType.Reset
    }
  })),

  on(AuthActions.register, (state, action) => ({
    ...state,
    loadingStatus: {
      viewStatus: ViewStatus.Loading,
      loadingType: LoadingType.Register
    }
  })),
  on(AuthActions.registerSuccess, (state, action) => ({
    ...state,
    loadingStatus: {
      viewStatus: ViewStatus.Failure,
      errorMessage: undefined,
      successMessage: "Your account was successfuly created.",
      loadingType: LoadingType.Register
    }
  })),
  on(AuthActions.registerFailure, (state, action) => ({
    ...state,
    loadingStatus: {
      viewStatus: ViewStatus.Failure,
      errorMessage: action.errorMessage,
      successMessage: undefined,
      loadingType: LoadingType.Register
    }
  })),

);

