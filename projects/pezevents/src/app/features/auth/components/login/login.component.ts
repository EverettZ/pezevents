
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
import { filter, share, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user$: Observable<User | undefined>;
  authLoading$: Observable<boolean>;

  form: FormGroup;

  serverMessage: string = "";

  constructor(public afAuth: AngularFireAuth, private fb: FormBuilder,
    private store: Store, private router: Router) {

    this.store.select(authSelector.selectIsLoggedIn).pipe(
      filter(loggedIn => !!loggedIn),
      take(1)
    ).subscribe(_ => {
      this.router.navigate(['/home']);
    });

    this.user$ = store.select(authSelector.selectAuthUser).pipe(
      share()
    );
    this.authLoading$ = store.select(authSelector.selectAuthLoading);

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.minLength(6), Validators.required]
      ]
    });


  }

  ngOnInit() {

  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }


  onSubmit() {
    const email = this.email?.value;
    const password = this.password?.value;
    this.store.dispatch(auth.signIn({ email, password }));
  }

}
