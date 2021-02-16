import { TestBed } from '@angular/core/testing';

import { PezeventsLibService } from './pezevents-lib.service';

describe('PezeventsLibService', () => {
  let service: PezeventsLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PezeventsLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
