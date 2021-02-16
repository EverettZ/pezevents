import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { User } from '@pezetter/pezevents-lib'
import { Observable } from 'rxjs';
import * as auth from '../../../../actions/auth.actions';
import * as authSelector from '../../../../selectors/auth.selectors';
import * as authReducer from '../../../../reducers/auth.reducer';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  
  authLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this.authLoading$ = store.select(authSelector.selectAuthLoading);
  }
  ngOnInit(): void {
  }

}
