import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthComponent } from './components/auth/auth.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResetComponent } from './components/reset/reset.component';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        component: LoginComponent,
        path: 'login',
        canActivate: [LoginGuard]
      },
      {
        component: RegistrationComponent,
        path: 'registration',
        canActivate: [LoginGuard]
      },
      {
        component: ResetComponent,
        path: 'reset'
      },
      {
        component: ProfileComponent,
        path: 'profile',
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
