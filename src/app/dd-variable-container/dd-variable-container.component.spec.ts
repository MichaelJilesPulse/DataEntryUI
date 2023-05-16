import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdVariableContainerComponent } from './dd-variable-container.component';

describe('DdVariableContainerComponent', () => {
  let component: DdVariableContainerComponent;
  let fixture: ComponentFixture<DdVariableContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdVariableContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DdVariableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
