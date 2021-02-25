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
import { filter, map, share, skipUntil, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingType, User } from '@pezetter/pezevents-lib'
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
    const user$ = this.store.select(authSelector.selectAuthUser).pipe(
      filter(user => !!user)
    );
    const userId$ = user$.pipe(
      map(user => user?.id),
      take(1),
      share()
    );

    user$.subscribe((user) => {
      if(user?.businesses) {
        this.store.dispatch(userBusinesses.loadBusinessessApi({ businesses: user.businesses }))
      }
    })
    
    return true;
  }
}

