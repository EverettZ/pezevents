import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as BusinessesActions from '../actions/user-businesses.actions';
import { Business } from '@pezetter/pezevents-lib'

export const BusinessesFeatureKey = 'Businesses';

export interface State extends EntityState<Business> {
  selectedBusinessId: string | null;
}

export const adapter: EntityAdapter<Business> = createEntityAdapter<Business>({
  sortComparer: sortByName,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedBusinessId: null
});


export function selectBusinessId(a: Business): string {
  //In this case this would be optional since primary key is id
  return a.id ?? '';
}
 
export function sortByName(a: Business, b: Business): number {
  return a.displayName.localeCompare(b.displayName);
} 


const BusinessReducer = createReducer(
  initialState,

  //#region custom actions
  on(BusinessesActions.loadBusinessessApi, state => state),
  on(BusinessesActions.loadBusinessessApiSuccess, (state, action) => state),
  on(BusinessesActions.loadBusinessessApiFailure, (state, action) => state),
  //#endregion

  //#region entityAdaper actions
  on(BusinessesActions.addBusiness, (state, { business }) => {
    return adapter.addOne(business, state)
  }),
  on(BusinessesActions.setBusiness, (state, { business }) => {
    return adapter.setOne(business, state)
  }),
  on(BusinessesActions.upsertBusiness, (state, { business }) => {
    return adapter.upsertOne(business, state);
  }),
  on(BusinessesActions.addBusinesses, (state, { businesses }) => {
    return adapter.addMany(businesses, state);
  }),
  on(BusinessesActions.upsertBusinesses, (state, { businesses }) => {
    return adapter.upsertMany(businesses, state);
  }),
  on(BusinessesActions.updateBusiness, (state, { update }) => {
    return adapter.updateOne(update, state);
  }),
  on(BusinessesActions.updateBusinesses, (state, { updates }) => {
    return adapter.updateMany(updates, state);
  }),
  on(BusinessesActions.mapBusiness, (state, { entityMap }) => {
    return adapter.mapOne(entityMap, state);
  }),
  on(BusinessesActions.mapBusinesses, (state, { entityMap }) => {
    return adapter.map(entityMap, state);
  }),
  on(BusinessesActions.deleteBusiness, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(BusinessesActions.deleteBusinesses, (state, { ids }) => {
    return adapter.removeMany(ids, state);
  }),
  on(BusinessesActions.deleteBusinessesByPredicate, (state, { predicate }) => {
    return adapter.removeMany(predicate, state);
  }),
  on(BusinessesActions.loadBusinesses, (state, { businesses }) => {
    return adapter.setAll(businesses, state);
  }),
  on(BusinessesActions.clearBusinesses, state => {
    return adapter.removeAll({ ...state, selectedBusinessId: null  });
  })
  //#endregion
);

export function reducer(state: State | undefined, action: Action) {
  return BusinessReducer(state, action);
}
 
export const getSelectedBusinessId = (state: State) => state.selectedBusinessId;
 
// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
 
// select the array of user ids
export const selectBusinessesIds = selectIds;
 
// select the dictionary of user entities
export const selectBusinessesEntities = selectEntities;
 
// select the array of users
export const selectAllBusinesses = selectAll;
 
// select the total user count
export const selectBusinessesTotal = selectTotal;