import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBusinesses from '../reducers/user-businesses.reducer';
import { Business } from '@pezetter/pezevents-lib'
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export const selectBusinessesState = createFeatureSelector<fromBusinesses.State>(fromBusinesses.BusinessesFeatureKey);

export interface State {
  businesses: fromBusinesses.State;
}
 
export const reducers: ActionReducerMap<State> = {
  businesses: fromBusinesses.reducer,
};
 
export const selectBusinessesIds = createSelector(
  selectBusinessesState,
  fromBusinesses.selectBusinessesIds // shorthand for usersState => fromUser.selectBusinessesIds(usersState)
);
export const selectBusinessesEntities = createSelector(
  selectBusinessesState,
  fromBusinesses.selectBusinessesEntities
);
export const selectAllBusinesses = createSelector(
  selectBusinessesState,
  fromBusinesses.selectAllBusinesses
);
export const selectBusinessesTotal = createSelector(
  selectBusinessesState,
  fromBusinesses.selectBusinessesTotal
);
export const selectCurrentBusinessId = createSelector(
  selectBusinessesState,
  fromBusinesses.getSelectedBusinessId
);
export const selectCurrentBusiness = createSelector(
  selectBusinessesEntities,
  selectCurrentBusinessId,
  (userEntities, businessId) => businessId ? userEntities[businessId] : null
);
export const selectBusinessById = (id: string) => createSelector(
  selectBusinessesEntities,
  (BusinessEntities) => id ? BusinessEntities[id] : null
);