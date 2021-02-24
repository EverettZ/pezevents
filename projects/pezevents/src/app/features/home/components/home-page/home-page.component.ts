import { Business, UserBusiness } from '@pezetter/pezevents-lib'
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as userBusinesses from '../../../../actions/user-businesses.actions';
import * as authSelector from '../../../../selectors/auth.selectors';
import * as userBusinessesSelector from '../../../../selectors/user-businesses.selectors';
import { Observable } from 'rxjs';
import { map, share, take } from 'rxjs/operators';
import * as businessActions from '../../../../actions/business.actions';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit  {

  business: Business | null;
  userBusinesses$: Observable<Business[]>;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store) {
    this.business = null;
    this.userBusinesses$ = this.store.select(userBusinessesSelector.selectAllBusinesses);

    this.store.dispatch(businessActions.clearSelectedId())
  }

  ngOnInit(): void {


  }

}
