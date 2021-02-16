import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as auth from './actions/auth.actions';
import * as authSelector from './selectors/auth.selectors';
import * as authReducer from './reducers/auth.reducer';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, skipUntil, take, tap, switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pezevents';
  constructor(private store: Store, public afAuth: AngularFireAuth) {
    this.afAuth.authState.pipe(
      tap((authState) => {
        console.log("App component", "authState changed");
        if (!!authState) {
          this.store.dispatch(auth.loadAuths())
        } 
      }),
      take(1)
    ).subscribe()

  }
}
