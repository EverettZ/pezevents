import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, exhaustMap, tap, take, switchMap, filter, delay } from 'rxjs/operators';
import { EMPTY, from, of } from 'rxjs';

import * as AuthActions from '../actions/auth.actions';
import { UserService } from '../services/user.service';
import { LoadingType, ViewStatus } from '@pezetter/pezevents-lib'
import { Router } from '@angular/router';
import { reset } from '../actions/auth.actions';
import { User } from '@pezetter/pezevents-lib'
import { SnackService } from '../services/snack.service';
import * as authReducer from '../reducers/auth.reducer';
import { UserInfo } from '@firebase/auth-types';



@Injectable()
export class AuthEffects {

  //#region loadAuths/loadUser
  loadAuths$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadAuths),
      switchMap(_ => {
        return this.user.getFirebaseAuthState()
      }),
      map(authData => {
        if (authData) {
          return extractUserAuthData(authData);
        }
        return AuthActions.notAuthenticated();
      }),
      catchError(err => {
        const errorMessage = err.message ? err.message : "User information could not be loaded.";
        return of(AuthActions.authError(errorMessage));
      })
    );
  });
  //#endregion

  //#region signOut
  signOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signOut),
      switchMap(_ => {
        return this.user.signOut();
      }),
      map(_ => {
        return AuthActions.notAuthenticated();
      }),
      tap((_) => {
        this.router.navigate(['/auth/login'])
      }),
      catchError(err => {
        const errorMessage = err.message ? err.message : "An issue occured when trying to logout.";
        return of(AuthActions.authError(errorMessage));
      })
    );
  });

  signOutSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signOutSuccess),
      take(1),
      tap(_ => {
        console.log("SIGN OUT SUCCESS TAP")
        this.router.navigate(['/auth/login'])
      })
    );
  });
  //#endregion

  //#region passwordReset
  passwordReset$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.reset),
      switchMap(({ email }) => {
        // console.log("resetting password email")
        return this.user.passwordReset(email).pipe(
          map((_) => {
            return AuthActions.resetSuccess({ email });
          }),
          catchError(err => {
            return of(AuthActions.resetFailure({ errorMessage: err.message || "The password reset email could not be sent." }));
          })
        )
      }),

    );
  });

  passwordResetSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.resetSuccess),
      take(1),
      tap(({ email }) => {
        this.snack.snackMessage(`Password reset email has been sent to: ${email}`);
        this.router.navigate(['/auth/login']);
      })
    );
  });
  //#endregion

  //#region signIn
  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signIn),
      switchMap(({ email, password }) => {
        return this.user.signInWithEmail(email, password)
      }),
      map((result) => {
        // successful login
        return AuthActions.loadAuths();
      }),
      catchError(err => {
        const errorMessage = err.message ? err.message : "User information could not be loaded.";
        return of(AuthActions.authError(errorMessage));
      })
    );
  });


  googleSignIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.googleSignIn),
      switchMap(action => {
        return this.user.googleSignIn();
      }),
      map((result) => {
        // successful login
        return AuthActions.loadAuths();
      }),
      catchError(err => {
        const errorMessage = err.message ? err.message : "User information could not be loaded.";
        return of(AuthActions.authError(errorMessage));
      })
    );
  });
  //#endregion

  //#region register/create account
  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap(action => {
        return this.user.createUserWithEmailAndPassword(action.email, action.password);
      }),
      map(userCreated => {
        return AuthActions.registerSuccess({
          loadingStatus: {
            viewStatus: ViewStatus.Success,
            successMessage: `${userCreated.user?.displayName} information loaded successfully through google.`,
            errorMessage: ""
          },
          id: userCreated?.user?.uid as string
        });

      }),
      catchError(err => {
        return of(AuthActions.registerFailure({ errorMessage: err.message || "Account registration could not be completed." }));
      })
    );
  });

  registerSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.registerSuccess),
      switchMap(action => of(AuthActions.loadAuths()).pipe(
        take(1),
        tap(_ => {
          this.router.navigate(['/home'])
          this.snack.snackMessage("Registered successfuly")

        })
      ))
    );
  });
  //#endregion

  //#region loadUserData
  loadUserData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadUserData),
      switchMap(action => of(AuthActions.loadAuths()).pipe(
        take(1),
        tap(_ => {
          this.router.navigate(['/home'])
          this.snack.snackMessage("Registered successfuly")

        })
      ))
    );
  });

  loadUserDataSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadUserDataSuccess),
      switchMap(action => of(AuthActions.loadAuths()).pipe(
        take(1),
        tap(_ => {
          this.router.navigate(['/home'])
          this.snack.snackMessage("Registered successfuly")

        })
      ))
    );
  });

  loadUserDataFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadUserDataFailure),
      switchMap(action => of(AuthActions.loadAuths()).pipe(
        take(1),
        tap(_ => {
          this.router.navigate(['/home'])
          this.snack.snackMessage("Registered successfuly")

        })
      ))
    );
  });
  //#endregion

  constructor(private actions$: Actions, private user: UserService, private router: Router, private snack: SnackService) { }

}
function extractUserAuthData({ displayName, uid, email, phoneNumber, photoURL, providerId, isAnonymous, emailVerified, metadata }: firebase.default.User) {
  const userData: User = {
    displayName,
    uid,
    email,
    phoneNumber,
    photoURL,
    providerId,
    createdAt: metadata.creationTime,
    lastLoginAt: metadata.lastSignInTime,
    isAnonymous,
    emailVerified
  };
  return AuthActions.authenticated({ user: userData });
}

