import { EntityMap, EntityMapOne, Predicate, Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Business } from '@pezetter/pezevents-lib';


export const loadBusinessApi = createAction(
  '[PublicBusiness] Load Business',
  props<{ id: string }>()
);

export const loadBusinessApiSuccess = createAction(
  '[PublicBusiness] Load Business Success',
  props<{ data: Business }>()
);

export const loadBusinessApiFailure = createAction(
  '[PublicBusiness] Load Business Failure',
  props<{ error: any }>()
);


export const loadBusinesses = createAction('[PublicBusiness] Load Businesses', props<{ businesses: Business[] }>());
export const addBusiness = createAction('[PublicBusiness] Add Business', props<{ business: Business }>());
export const setBusiness = createAction('[PublicBusiness] Set Business', props<{ business: Business }>());
export const upsertBusiness = createAction('[PublicBusiness] Upsert Business', props<{ business: Business }>());
export const addBusinesses = createAction('[PublicBusiness] Add Businesses', props<{ businesses: Business[] }>());
export const upsertBusinesses = createAction('[PublicBusiness] Upsert Businesses', props<{ businesses: Business[] }>());
export const updateBusiness = createAction('[PublicBusiness] Update Business', props<{ update: Update<Business> }>());
export const updateBusinesses = createAction('[PublicBusiness] Update Businesses', props<{ updates: Update<Business>[] }>());
export const mapBusiness = createAction('[PublicBusiness] Map Business', props<{ entityMap: EntityMapOne<Business> }>());
export const mapBusinesses = createAction('[PublicBusiness] Map Businesses', props<{ entityMap: EntityMap<Business> }>());
export const deleteBusiness = createAction('[PublicBusiness] Delete Business', props<{ id: string }>());
export const deleteBusinesses = createAction('[PublicBusiness] Delete Businesses', props<{ ids: string[] }>());
export const deleteBusinessesByPredicate = createAction('[PublicBusiness] Delete Businesses By Predicate', props<{ predicate: Predicate<Business> }>());
export const clearBusinesses = createAction('[PublicBusiness] Clear Businesss');
export const clearSelectedId = createAction('[PublicBusiness] Clear Selected Business ID');