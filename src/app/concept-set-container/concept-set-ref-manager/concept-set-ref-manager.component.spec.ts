import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptSetRefManagerComponent } from './concept-set-ref-manager.component';

describe('ConceptSetRefManagerComponent', () => {
  let component: ConceptSetRefManagerComponent;
  let fixture: ComponentFixture<ConceptSetRefManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptSetRefManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptSetRefManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
