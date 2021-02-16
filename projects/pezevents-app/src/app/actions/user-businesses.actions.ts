import { EntityMap, EntityMapOne, Predicate, Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { UserBusiness } from '@pezetter/pezevents-lib';

export const loadUserBusinessessApi = createAction(
  '[UserBusinesss] Load UserBusinessess',
  props<{ uid: string }>()
);

export const loadUserBusinessessApiSuccess = createAction(
  '[UserBusiness] Load UserBusinessess Success',
  props<{ data: UserBusiness }>()
);

export const loadUserBusinessessApiFailure = createAction(
  '[UserBusiness] Load UserBusinessess Failure',
  props<{ error: any }>()
);


export const loadUserBusinesses = createAction('[UserBusiness] Load Businesses', props<{ businesses: UserBusiness[] }>());
export const addUserBusiness = createAction('[UserBusiness] Add Business', props<{ business: UserBusiness }>());
export const setUserBusiness = createAction('[UserBusiness] Set Business', props<{ business: UserBusiness }>());
export const upsertUserBusiness = createAction('[UserBusiness] Upsert Business', props<{ business: UserBusiness }>());
export const addUserBusinesses = createAction('[UserBusiness] Add Businesses', props<{ businesses: UserBusiness[] }>());
export const upsertUserBusinesses = createAction('[UserBusiness] Upsert Businesses', props<{ businesses: UserBusiness[] }>());
export const updateUserBusiness = createAction('[UserBusiness] Update Business', props<{ update: Update<UserBusiness> }>());
export const updateUserBusinesses = createAction('[UserBusiness] Update Businesses', props<{ updates: Update<UserBusiness>[] }>());
export const mapUserBusiness = createAction('[UserBusiness] Map Business', props<{ entityMap: EntityMapOne<UserBusiness> }>());
export const mapUserBusinesses = createAction('[UserBusiness] Map Businesses', props<{ entityMap: EntityMap<UserBusiness> }>());
export const deleteUserBusiness = createAction('[UserBusiness] Delete Business', props<{ id: string }>());
export const deleteUserBusinesses = createAction('[UserBusiness] Delete Businesses', props<{ ids: string[] }>());
export const deleteBusinessesByPredicate = createAction('[UserBusiness] Delete Businesses By Predicate', props<{ predicate: Predicate<UserBusiness> }>());
export const clearUserBusinesses = createAction('[UserBusiness] Clear Businesss');