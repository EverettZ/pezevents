import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import * as fromAuth from '../../reducers/auth.reducer';
import { AuthEffects } from '../../effects/auth.effects';
import { ReactiveFormsModule } from '@angular/forms';

// Material imports
import { SharedModule } from '../../shared/shared.module';
import { GoogleSigninDirective } from './directives/google-signin.directive';
import { AuthComponent } from './components/auth/auth.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResetComponent } from './components/reset/reset.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    GoogleSigninDirective,
    AuthComponent,
    ProfileComponent,
    ResetComponent
  ],
  exports: [
    GoogleSigninDirective
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthModule { }
