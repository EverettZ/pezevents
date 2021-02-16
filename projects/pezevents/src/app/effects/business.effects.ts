import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as BusinessActions from '../actions/business.actions';
import { BusinessService } from '../services/business.service';



@Injectable()
export class BusinessEffects {

  loadBusinessApi$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BusinessActions.loadBusinessApi),
      switchMap(({ id }) => {
        return this.business.getBusinessById(id);
      }),
      map((business) => {
        // TODO
        return BusinessActions.setBusiness({ business })
      }),
      catchError((error) => {
        return of(BusinessActions.loadBusinessApiFailure({ error }));
      })
    );
  });



  constructor(private actions$: Actions, private business: BusinessService) {}

}
