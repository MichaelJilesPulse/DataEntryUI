import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdVariableRefManagerComponent } from './dd-variable-ref-manager.component';

describe('DdVariableRefManagerComponent', () => {
  let component: DdVariableRefManagerComponent;
  let fixture: ComponentFixture<DdVariableRefManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdVariableRefManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DdVariableRefManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
