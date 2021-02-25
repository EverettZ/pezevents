import { BusinessService } from './../services/business.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as UserBusinessesActions from '../actions/user-businesses.actions';
import { UserService } from '../services/user.service';



@Injectable()
export class UserBusinessesEffects {

  loadUserBusinessessApi$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserBusinessesActions.loadBusinessessApi),
      switchMap(({businesses}) => {
        return this.business.getUsersBusinesses(businesses);
      }),
      map((businesses) => {
        return UserBusinessesActions.loadBusinesses({ businesses })
      }),
      catchError((error) => {
        return of(UserBusinessesActions.loadBusinessessApiFailure({ error }));
      })
    );
  });



  constructor(private actions$: Actions, private business: BusinessService) { }

}
