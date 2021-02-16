import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBusiness from '../reducers/business.reducer';

export const selectBusinessesState = createFeatureSelector<fromBusiness.State>(fromBusiness.businessFeatureKey);

export interface State {
  businesses: fromBusiness.State;
}
 
export const reducers: ActionReducerMap<State> = {
  businesses: fromBusiness.reducer,
};
 
export const selectBusinessesIds = createSelector(
  selectBusinessesState,
  fromBusiness.selectBusinessesIds // shorthand for usersState => fromUser.selectBusinessesIds(usersState)
);
export const selectBusinessesEntities = createSelector(
  selectBusinessesState,
  fromBusiness.selectBusinessesEntities
);
export const selectAllBusinesses = createSelector(
  selectBusinessesState,
  fromBusiness.selectAllBusinesses
);
export const selectBusinessesTotal = createSelector(
  selectBusinessesState,
  fromBusiness.selectBusinessesTotal
);
export const selectCurrentBusinessId = createSelector(
  selectBusinessesState,
  fromBusiness.getSelectedBusinessId
);
export const selectCurrentBusiness = createSelector(
  selectBusinessesEntities,
  selectCurrentBusinessId,
  (userEntities, businessId) => {
    console.log("userEntities", userEntities);
    console.log("businessId", businessId);
    return businessId ? userEntities[businessId] : null;
  }
);