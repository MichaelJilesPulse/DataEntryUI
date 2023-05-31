import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdVariablePickerComponent } from './dd-variable-picker.component';

describe('DdVariablePickerComponent', () => {
  let component: DdVariablePickerComponent;
  let fixture: ComponentFixture<DdVariablePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdVariablePickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DdVariablePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
