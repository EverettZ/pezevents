import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as UserBusinessesActions from '../actions/user-businesses.actions';
import { UserBusiness } from '@pezetter/pezevents-lib'

export const userBusinessesFeatureKey = 'userBusinesses';

export interface State extends EntityState<UserBusiness> {
  selectedUserBusinessId: string | null;
}

export const adapter: EntityAdapter<UserBusiness> = createEntityAdapter<UserBusiness>({
  sortComparer: sortByName,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedUserBusinessId: null
});


export function selectUserBusinessId(a: UserBusiness): string {
  //In this case this would be optional since primary key is id
  return a.id;
}
 
export function sortByName(a: UserBusiness, b: UserBusiness): number {
  return a.displayName.localeCompare(b.displayName);
} 


const userBusinessReducer = createReducer(
  initialState,

  //#region custom actions
  on(UserBusinessesActions.loadUserBusinessessApi, state => state),
  on(UserBusinessesActions.loadUserBusinessessApiSuccess, (state, action) => state),
  on(UserBusinessesActions.loadUserBusinessessApiFailure, (state, action) => state),
  //#endregion

  //#region entityAdaper actions
  on(UserBusinessesActions.addUserBusiness, (state, { business }) => {
    return adapter.addOne(business, state)
  }),
  on(UserBusinessesActions.setUserBusiness, (state, { business }) => {
    return adapter.setOne(business, state)
  }),
  on(UserBusinessesActions.upsertUserBusiness, (state, { business }) => {
    return adapter.upsertOne(business, state);
  }),
  on(UserBusinessesActions.addUserBusinesses, (state, { businesses }) => {
    return adapter.addMany(businesses, state);
  }),
  on(UserBusinessesActions.upsertUserBusinesses, (state, { businesses }) => {
    return adapter.upsertMany(businesses, state);
  }),
  on(UserBusinessesActions.updateUserBusiness, (state, { update }) => {
    return adapter.updateOne(update, state);
  }),
  on(UserBusinessesActions.updateUserBusinesses, (state, { updates }) => {
    return adapter.updateMany(updates, state);
  }),
  on(UserBusinessesActions.mapUserBusiness, (state, { entityMap }) => {
    return adapter.mapOne(entityMap, state);
  }),
  on(UserBusinessesActions.mapUserBusinesses, (state, { entityMap }) => {
    return adapter.map(entityMap, state);
  }),
  on(UserBusinessesActions.deleteUserBusiness, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(UserBusinessesActions.deleteUserBusinesses, (state, { ids }) => {
    return adapter.removeMany(ids, state);
  }),
  on(UserBusinessesActions.deleteBusinessesByPredicate, (state, { predicate }) => {
    return adapter.removeMany(predicate, state);
  }),
  on(UserBusinessesActions.loadUserBusinesses, (state, { businesses }) => {
    return adapter.setAll(businesses, state);
  }),
  on(UserBusinessesActions.clearUserBusinesses, state => {
    return adapter.removeAll({ ...state, selectedUserBusinessId: null  });
  })
  //#endregion
);

export function reducer(state: State | undefined, action: Action) {
  return userBusinessReducer(state, action);
}
 
export const getSelectedUserBusinessId = (state: State) => state.selectedUserBusinessId;
 
// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
 
// select the array of user ids
export const selectUserBusinessesIds = selectIds;
 
// select the dictionary of user entities
export const selectUserBusinessesEntities = selectEntities;
 
// select the array of users
export const selectAllUserBusinesses = selectAll;
 
// select the total user count
export const selectUserBusinessesTotal = selectTotal;