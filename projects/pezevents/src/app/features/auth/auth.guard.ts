import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  UrlTree,
} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { SnackService } from '../../services/snack.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as auth from '../../actions/auth.actions';
import * as authSelector from '../../selectors/auth.selectors';
import * as authReducer from '../../reducers/auth.reducer';
import { map, skipUntil, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingType } from '@pezetter/pezevents-lib';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private afAuth: AngularFireAuth,
    private snack: SnackService,
    private store: Store,
    private router: Router
  ) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.userLoginCheck()
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.userLoginCheck();
  }

  private userLoginCheck(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    return this.afAuth.authState.pipe(
      skipUntil(this.store.select(authSelector.selectAuthUser)),
      map(user => {
        if (user) {
          return true;
        }
        return this.router.parseUrl("/auth/login");
      }),
      take(1)
    )
  }
}

