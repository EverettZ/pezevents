import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PezeventsLibComponent } from './pezevents-lib.component';

describe('PezeventsLibComponent', () => {
  let component: PezeventsLibComponent;
  let fixture: ComponentFixture<PezeventsLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PezeventsLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PezeventsLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
