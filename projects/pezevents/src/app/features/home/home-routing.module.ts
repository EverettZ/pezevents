import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BusinessesComponent } from './components/businesses/businesses.component';
import { BusinessComponent } from '../business/components/business/business.component';
// /home route
const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'businesses'
      },
      {
        path: 'businesses',
        component: BusinessesComponent
      },
      {
        path: 'business',
        component: BusinessComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: '../businesses'
          },
          {
            path: ':id',
            loadChildren: () => import('../business/business.module').then(m => m.BusinessModule)
          }
        ]
      },
      {
        path: 'create-business',
        loadChildren: () => import('../create-business/create-business.module').then(m => m.CreateBusinessModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
