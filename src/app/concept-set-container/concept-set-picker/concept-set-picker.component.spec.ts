import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptSetPickerComponent } from './concept-set-picker.component';

describe('ConceptSetPickerComponent', () => {
  let component: ConceptSetPickerComponent;
  let fixture: ComponentFixture<ConceptSetPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptSetPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptSetPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
