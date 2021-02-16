import { Directive, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import * as auth from '../../../actions/auth.actions';


@Directive({
  selector: '[appGoogleSignin]'
})
export class GoogleSigninDirective {
  constructor(private store: Store) {}

  @HostListener('click')
  onclick() {
    this.store.dispatch(auth.googleSignIn());
  }
}
