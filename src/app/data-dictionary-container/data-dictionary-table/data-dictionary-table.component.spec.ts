import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDictionaryTableComponent } from './data-dictionary-table.component';

describe('DataDictionaryTableComponent', () => {
  let component: DataDictionaryTableComponent;
  let fixture: ComponentFixture<DataDictionaryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataDictionaryTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataDictionaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
