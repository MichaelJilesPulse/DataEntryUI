import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptSetContainerComponent } from './concept-set-container.component';

describe('ConceptSetContainerComponent', () => {
  let component: ConceptSetContainerComponent;
  let fixture: ComponentFixture<ConceptSetContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptSetContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptSetContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
