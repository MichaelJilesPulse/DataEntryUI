import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDictionaryContainerComponent } from './data-dictionary-container.component';

describe('DataDictionaryContainerComponent', () => {
  let component: DataDictionaryContainerComponent;
  let fixture: ComponentFixture<DataDictionaryContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataDictionaryContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataDictionaryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
