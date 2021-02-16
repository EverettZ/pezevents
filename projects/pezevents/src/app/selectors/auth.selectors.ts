import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';
import { LoadingType, User, ViewStatus } from '@pezetter/pezevents-lib';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectAuthUser = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.user
);

export const selectIsLoggedIn = createSelector(
  selectAuthUser,
  (user: User | undefined) => user ? true : false
);

export const selectAuthSignInIsLoading = createSelector(
  selectAuthState,
  ({ loadingStatus }) => {
    if (loadingStatus.loadingType == LoadingType.SignIn) {
      return loadingStatus.viewStatus == ViewStatus.Loading;
    }
    return false;
  }
);


export const selectAuthUserIsLoading = createSelector(
  selectAuthState,
  ({ loadingStatus }) => {
    if (loadingStatus.loadingType == LoadingType.User) {
      return loadingStatus.viewStatus == ViewStatus.Loading;
    }
    return false;
  }
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  ({ loadingStatus }) => {
    return loadingStatus.viewStatus == ViewStatus.Loading;
  }
);


export const selectAuthLoadingStatus = createSelector(
  selectAuthState,
  ({ loadingStatus }) => {
    return loadingStatus
  }
);

export const selectAuthErrorMessage = createSelector(
  selectAuthLoadingStatus,
  ({ errorMessage }) => {
    return errorMessage;
  }
);

export const selectAuthSuccessMessage = createSelector(
  selectAuthLoadingStatus,
  ({ successMessage }) => {
    return successMessage;
  }
);
