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
      ofType(UserBusinessesActions.loadUserBusinessessApi),
      switchMap(({ uid }) => {
        return this.user.getUserDataBusinesses(uid);
      }),
      map((businesses) => {
        return UserBusinessesActions.loadUserBusinesses({ businesses })
      }),
      catchError((error) => {
        return of(UserBusinessesActions.loadUserBusinessessApiFailure({ error }));
      })
    );
  });



  constructor(private actions$: Actions, private user: UserService) { }

}
