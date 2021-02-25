import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as userBusinesses from '../../../../actions/user-businesses.actions';
import * as businessSelector from '../../../../selectors/business.selectors';
import * as businessActions from '../../../../actions/business.actions';
import * as authSelector from '../../../../selectors/auth.selectors';
import * as userBusinessesSelector from '../../../../selectors/user-businesses.selectors';
import { Observable, of } from 'rxjs';
import { map, share, take, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {

  // business$: Observable<Business>;
  // user$: Observable<User>;
  // subTitle$: Observable<string>;

  viewDate: Date = new Date();

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [
      { title: 'event 1', date: '2019-04-01' },
      { title: 'event 2', date: '2019-04-02' }
    ]
  };


  constructor() { 
    // this.business$ = this.store.select(businessSelector.selectCurrentBusiness) as Observable<Business>;
    // this.user$ = this.store.select(authSelector.selectAuthUser) as Observable<User>;
    // this.subTitle$ = this.business$.pipe(
    //   switchMap(({ id }) => {
    //     if (id) {
    //       return this.store.select(userBusinessesSelector.selectBusinessById(id)).pipe(
    //         map(userBus => {
    //           return userBus?.role || '';
    //         })
    //       )
    //     }
    //     return of('');
    //   })
    // )
  }

  ngOnInit(): void {
  }

}
