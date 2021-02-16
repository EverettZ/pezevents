import { EntityMap, EntityMapOne, Predicate, Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Business } from '../../../../../dist/pezevents-lib/lib/models/business.interface';

export const loadBusinessApi = createAction(
  '[Business] Load Business',
  props<{ id: string }>()
);

export const loadBusinessApiSuccess = createAction(
  '[Business] Load Business Success',
  props<{ data: Business }>()
);

export const loadBusinessApiFailure = createAction(
  '[Business] Load Business Failure',
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
export const clearSelectedId = createAction('[Business] Clear Selected Business ID');