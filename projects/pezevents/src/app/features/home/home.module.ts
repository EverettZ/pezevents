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
import * as fromUserBusinesses from '../../reducers/user-businesses.reducer';
import { UserBusinessesEffects } from '../../effects/user-businesses.effects';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';
import { BusinessesComponent } from './components/businesses/businesses.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    HomePageComponent,
    BusinessesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    StoreModule.forFeature(fromBusiness.businessFeatureKey, fromBusiness.reducer),
    EffectsModule.forFeature([BusinessEffects, UserBusinessesEffects]),
    StoreModule.forFeature(fromUserBusinesses.BusinessesFeatureKey, fromUserBusinesses.reducer),
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    FullCalendarModule // register FullCalendar with you app
  ]
})
export class HomeModule { }
