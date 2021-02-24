import { EntityMap, EntityMapOne, Predicate, Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Business } from '@pezetter/pezevents-lib';

export const loadBusinessessApi = createAction(
  '[Businesss] Load Businessess',
  props<{ uid: string }>()
);

export const loadBusinessessApiSuccess = createAction(
  '[Business] Load Businessess Success',
  props<{ data: Business }>()
);

export const loadBusinessessApiFailure = createAction(
  '[Business] Load Businessess Failure',
  props<{ error: any }>()
);


export const loadBusinesses = createAction('[Business] Load Businesses', props<{ businesses: Business[] }>());
export const addBusiness = createAction('[Business] Add Business', props<{ business: Business }>());
export const setBusiness = createAction('[Business] Set Business', props<{ business: Business }>());
export const upsertBusiness = createAction('[Business] Upsert Business', props<{ business: Business }>());
export const addBusinesses = createAction('[Business] Add Businesses', props<{ businesses: Business[] }>());
export const upsertBusinesses = createAction('[Business] Upsert Businesses', props<{ businesses: Business[] }>());
export const updateBusiness = createAction('[Business] Update Business', props<{ update: Update<Business> }>());
export const updateBusinesses = createAction('[Business] Update Businesses', props<{ updates: Update<Business>[] }>());
export const mapBusiness = createAction('[Business] Map Business', props<{ entityMap: EntityMapOne<Business> }>());
export const mapBusinesses = createAction('[Business] Map Businesses', props<{ entityMap: EntityMap<Business> }>());
export const deleteBusiness = createAction('[Business] Delete Business', props<{ id: string }>());
export const deleteBusinesses = createAction('[Business] Delete Businesses', props<{ ids: string[] }>());
export const deleteBusinessesByPredicate = createAction('[Business] Delete Businesses By Predicate', props<{ predicate: Predicate<Business> }>());
export const clearBusinesses = createAction('[Business] Clear Businesss');