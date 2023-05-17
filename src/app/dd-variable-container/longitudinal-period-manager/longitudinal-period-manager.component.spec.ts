import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongitudinalPeriodManagerComponent } from './longitudinal-period-manager.component';

describe('LongitudinalPeriodManagerComponent', () => {
  let component: LongitudinalPeriodManagerComponent;
  let fixture: ComponentFixture<LongitudinalPeriodManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LongitudinalPeriodManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongitudinalPeriodManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
