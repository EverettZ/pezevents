import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { BusinessEffects } from './business.effects';

describe('BusinessEffects', () => {
  let actions$: Observable<any>;
  let effects: BusinessEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BusinessEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(BusinessEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
