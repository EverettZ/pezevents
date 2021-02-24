import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  UrlTree,
} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { SnackService } from '../../../services/snack.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as auth from '../../../actions/auth.actions';
import * as authSelector from '../../../selectors/auth.selectors';
import * as authReducer from '../../../reducers/auth.reducer';
import { map, share, skipUntil, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingType } from '@pezetter/pezevents-lib'
import * as userBusinesses from '../../../actions/user-businesses.actions';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate, CanActivateChild {
  constructor(
    private afAuth: AngularFireAuth,
    private snack: SnackService,
    private store: Store,
    private router: Router
  ) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.homeModuleInit()
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.homeModuleInit();
  }

  private homeModuleInit(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const userId$ = this.store.select(authSelector.selectAuthUser).pipe(
      map(user => user?.uid),
      take(1),
      share()
    );

    userId$.subscribe((uid) => {
      this.store.dispatch(userBusinesses.loadBusinessessApi({ uid: uid as string }))
    })
    
    return true;
  }
}

