import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import * as fromBusiness from '../../reducers/business.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BusinessEffects } from '../../effects/business.effects';
import { BusinessComponent } from './components/business/business.component';
import * as fromUserBusinesses from '../../reducers/user-businesses.reducer';
import { UserBusinessesEffects } from '../../effects/user-businesses.effects';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from '../../shared/calendar/calendar.module';

@NgModule({
  declarations: [
    HomePageComponent,
    BusinessComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    StoreModule.forFeature(fromBusiness.businessFeatureKey, fromBusiness.reducer),
    EffectsModule.forFeature([BusinessEffects, UserBusinessesEffects]),
    StoreModule.forFeature(fromUserBusinesses.userBusinessesFeatureKey, fromUserBusinesses.reducer),
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule
  ]
})
export class HomeModule { }
