import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import * as auth from '../../actions/auth.actions';
import * as authSelector from '../../selectors/auth.selectors';
import * as authReducer from '../../reducers/auth.reducer';
import { tap } from 'rxjs/operators';
import { User } from '@pezetter/pezevents-lib';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {

  user$: Observable<User | undefined>;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private store: Store) {

    this.user$ = store.select(authSelector.selectAuthUser).pipe(
      tap(ok => {
        console.log('SHELL: Select auth user suscribed', ok);
      })
    );
  }

  signOut() {
    this.store.dispatch(auth.signOut());
  }
}
