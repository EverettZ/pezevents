import { Business, User, EventMetadata } from '@pezetter/pezevents-lib'
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as userBusinesses from '../../../../actions/user-businesses.actions';
import * as businessSelector from '../../../../selectors/business.selectors';
import * as businessActions from '../../../../actions/business.actions';
import * as authSelector from '../../../../selectors/auth.selectors';
import * as userBusinessesSelector from '../../../../selectors/user-businesses.selectors';
import { Observable, of } from 'rxjs';
import { map, share, take, switchMap } from 'rxjs/operators';
import { CalendarView, CalendarEvent } from 'angular-calendar';


@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit, OnDestroy {

  // business: Business | null;
  business$: Observable<Business>;
  user$: Observable<User>;
  subTitle$: Observable<string>;
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent<EventMetadata>[] = [
    {
      start: new Date(),
      title: `
          <h4 class="d-inline mb-0">Private Lesson w/ Christine Vitkus</h4>
          <strong class="d-block m-0">Instructor(s)</strong>
          <small class="d-block m-0">Christine Vitkus</small>
          <strong class="d-block m-0">Student(s)</strong>
          <small class="d-block m-0">Everett Zettersten</small>
      `,
      color: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
      },
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
      meta: {
        organizers: [],
        attendees: [],
        inventory: [],
        description: "This is an even description"
      }
    },
  ];

  private readonly darkThemeClass = 'dark-theme';

  constructor(private route: ActivatedRoute, private router: Router, private store: Store) {
    // this.business = null;
    // this.store.dispatch(userBusinesses.setUserBusiness({}))
    this.business$ = this.store.select(businessSelector.selectCurrentBusiness) as Observable<Business>;
    this.user$ = this.store.select(authSelector.selectAuthUser) as Observable<User>;
    this.subTitle$ = this.business$.pipe(
      switchMap(({ id }) => {
        if (id) {
          return this.store.select(userBusinessesSelector.selectBusinessById(id)).pipe(
            map(userBus => {
              return userBus?.role || '';
            })
          )
        }
        return of('');
      })
    )
    // this.store.select(userBusinessesSelector.selec)
    // this.subTitle$ = this.user$.pipe(
    //   map(user => {
    //     user.
    //   })
    // )
  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id') as string;
    this.store.dispatch(businessActions.loadBusinessApi({ id }))

    // const userId$ = this.store.select(authSelector.selectAuthUser).pipe(
    //   map(user => user?.uid),
    //   take(1),
    //   share()
    // );

    // userId$.subscribe((uid) => {
    //   this.store.dispatch(userBusinesses.loadUserBusinessessApi({ uid: uid as string }))
    // })
  }

  ngOnDestroy(): void {
  }

}
