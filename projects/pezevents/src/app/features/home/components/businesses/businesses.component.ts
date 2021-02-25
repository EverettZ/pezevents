import { Component, OnInit } from '@angular/core';
import { Business } from '@pezetter/pezevents-lib'

import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as userBusinesses from '../../../../actions/user-businesses.actions';
import * as authSelector from '../../../../selectors/auth.selectors';
import * as userBusinessesSelector from '../../../../selectors/user-businesses.selectors';
import { Observable } from 'rxjs';
import { map, share, take } from 'rxjs/operators';
import * as businessActions from '../../../../actions/business.actions';

@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.scss']
})
export class BusinessesComponent implements OnInit {

  business: Business | null;
  userBusinesses$: Observable<Business[]>;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store) {

    this.business = null;
    this.userBusinesses$ = this.store.select(userBusinessesSelector.selectAllBusinesses);
  }

  ngOnInit(): void {
  }

}
