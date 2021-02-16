import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { User } from '@pezetter/pezevents-lib';
import { Observable } from 'rxjs';
import * as auth from '../../../../actions/auth.actions';
import * as authSelector from '../../../../selectors/auth.selectors';
import * as authReducer from '../../../../reducers/auth.reducer';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  authLoading$: Observable<boolean>;

  form: FormGroup;
  serverMessage: string = "";

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  get passwordDoesMatch() {
    return this.password?.value === this.passwordConfirm?.value;
  }

  constructor(public afAuth: AngularFireAuth, private fb: FormBuilder,
    private store: Store) {

    this.authLoading$ = store.select(authSelector.selectAuthLoading);

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.minLength(6), Validators.required]
      ],
      passwordConfirm: ['', []]
    });

  }
  ngOnInit(): void {
  }
  async onSubmit() {

    const email = this.email?.value;
    const password = this.password?.value;
    //     await this.afAuth.createUserWithEmailAndPassword(email, password);
    this.store.dispatch(auth.register({email, password}))
  }

}
