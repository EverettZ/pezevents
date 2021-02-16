import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarHeaderComponent } from './components/calendar-header/calendar-header.component';

import { CalendarModule as CalModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    CalendarComponent, 
    CalendarHeaderComponent
  ],
  exports: [
    CalendarComponent, 
    CalendarHeaderComponent
  ],
  imports: [
    CommonModule,
    CalModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatButtonModule
  ]
})
export class CalendarModule { }
