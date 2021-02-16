import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as BusinessActions from '../actions/business.actions';
import { Business } from '@pezetter/pezevents-lib'
import * as UserBusinessActions from '../actions/user-businesses.actions';

export const businessFeatureKey = 'business';


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
  return a.id || "";
}

export function sortByName(a: Business, b: Business): number {
  return a.displayName.localeCompare(b.displayName);
}


const userBusinessReducer = createReducer(
  initialState,

  //#region custom actions
  on(BusinessActions.loadBusinessApi, (state, action) => ({
    ...state
  })),
  on(BusinessActions.loadBusinessApiSuccess, (state, { data }) => ({
    ...state
  })),
  on(BusinessActions.loadBusinessApiFailure, (state, action) => state),
  //#endregion

  //#region entityAdaper actions
  on(BusinessActions.addBusiness, (state, { business }) => {
    return adapter.addOne(business, state)
  }),
  on(BusinessActions.setBusiness, (state, { business }) => {
    return {
      ...adapter.setOne(business, state),
      selectedBusinessId: business.id || ''
    }
  }),
  on(BusinessActions.upsertBusiness, (state, { business }) => {
    return adapter.upsertOne(business, state);
  }),
  on(BusinessActions.addBusinesses, (state, { businesses }) => {
    return adapter.addMany(businesses, state);
  }),
  on(BusinessActions.upsertBusinesses, (state, { businesses }) => {
    return adapter.upsertMany(businesses, state);
  }),
  on(BusinessActions.updateBusiness, (state, { update }) => {
    return adapter.updateOne(update, state);
  }),
  on(BusinessActions.updateBusinesses, (state, { updates }) => {
    return adapter.updateMany(updates, state);
  }),
  on(BusinessActions.mapBusiness, (state, { entityMap }) => {
    return adapter.mapOne(entityMap, state);
  }),
  on(BusinessActions.mapBusinesses, (state, { entityMap }) => {
    return adapter.map(entityMap, state);
  }),
  on(BusinessActions.deleteBusiness, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(BusinessActions.deleteBusinesses, (state, { ids }) => {
    return adapter.removeMany(ids, state);
  }),
  on(BusinessActions.deleteBusinessesByPredicate, (state, { predicate }) => {
    return adapter.removeMany(predicate, state);
  }),
  on(BusinessActions.loadBusinesses, (state, { businesses }) => {
    return adapter.setAll(businesses, state);
  }),
  on(BusinessActions.clearBusinesses, state => {
    return adapter.removeAll({ ...state, selectedBusinessId: null });
  }),
  on(BusinessActions.clearSelectedId, state => {
    return{ ...state, selectedBusinessId: null };
  })
  //#endregion
);

export function reducer(state: State | undefined, action: Action) {
  return userBusinessReducer(state, action);
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