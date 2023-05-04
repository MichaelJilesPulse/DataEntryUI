import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConceptSetDialogComponent } from './edit-concept-set-dialog.component';

describe('EditConceptSetDialogComponent', () => {
  let component: EditConceptSetDialogComponent;
  let fixture: ComponentFixture<EditConceptSetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditConceptSetDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditConceptSetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
