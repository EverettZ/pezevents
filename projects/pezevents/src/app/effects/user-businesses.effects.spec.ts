import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UserBusinessesEffects } from './user-businesses.effects';

describe('UserBusinessesEffects', () => {
  let actions$: Observable<any>;
  let effects: UserBusinessesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserBusinessesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(UserBusinessesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
