import { Component, OnInit } from '@angular/core';
import * as authSelector from '../../../../selectors/auth.selectors';

import { Store } from '@ngrx/store';
import { User } from '@pezetter/pezevents-lib';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$: Observable<User | undefined>;

  constructor(private store: Store) { 
    
    this.user$ = store.select(authSelector.selectAuthUser).pipe(
      tap(ok => {
        console.log('PROFILE Select auth user suscribed', ok);
      })
    );
  }

  ngOnInit(): void {
  }

}
