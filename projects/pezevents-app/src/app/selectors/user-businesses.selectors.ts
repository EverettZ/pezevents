import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUserBusinesses from '../reducers/user-businesses.reducer';
import { UserBusiness } from '@pezetter/pezevents-lib'
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export const selectUserBusinessesState = createFeatureSelector<fromUserBusinesses.State>(fromUserBusinesses.userBusinessesFeatureKey);

export interface State {
  businesses: fromUserBusinesses.State;
}
 
export const reducers: ActionReducerMap<State> = {
  businesses: fromUserBusinesses.reducer,
};
 
export const selectUserBusinessesIds = createSelector(
  selectUserBusinessesState,
  fromUserBusinesses.selectUserBusinessesIds // shorthand for usersState => fromUser.selectUserBusinessesIds(usersState)
);
export const selectUserBusinessesEntities = createSelector(
  selectUserBusinessesState,
  fromUserBusinesses.selectUserBusinessesEntities
);
export const selectAllUserBusinesses = createSelector(
  selectUserBusinessesState,
  fromUserBusinesses.selectAllUserBusinesses
);
export const selectUserBusinessesTotal = createSelector(
  selectUserBusinessesState,
  fromUserBusinesses.selectUserBusinessesTotal
);
export const selectCurrentUserBusinessId = createSelector(
  selectUserBusinessesState,
  fromUserBusinesses.getSelectedUserBusinessId
);
export const selectCurrentUserBusiness = createSelector(
  selectUserBusinessesEntities,
  selectCurrentUserBusinessId,
  (userEntities, businessId) => businessId ? userEntities[businessId] : null
);
export const selectBusinessById = (id: string) => createSelector(
  selectUserBusinessesEntities,
  (userBusinessEntities) => id ? userBusinessEntities[id] : null
);