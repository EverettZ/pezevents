import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { User } from'@pezetter/pezevents-lib';
import { Observable } from 'rxjs';
import * as auth from '../../../../actions/auth.actions';
import * as authSelector from '../../../../selectors/auth.selectors';
import * as authReducer from '../../../../reducers/auth.reducer';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  authLoading$: Observable<boolean>;

  form: FormGroup;

  serverMessage: string = "";

  constructor(public afAuth: AngularFireAuth, private fb: FormBuilder,
    private store: Store) {

    this.authLoading$ = store.select(authSelector.selectAuthLoading);

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

  }

  ngOnInit() {

  }

  get email() {
    return this.form.get('email');
  }

  async onSubmit() {

    const email = this.email?.value;
    this.store.dispatch(auth.reset({email: email}));

  }


}
