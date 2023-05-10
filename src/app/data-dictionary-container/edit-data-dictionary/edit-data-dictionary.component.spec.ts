import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDataDictionaryComponent } from './edit-data-dictionary.component';

describe('EditDataDictionaryComponent', () => {
  let component: EditDataDictionaryComponent;
  let fixture: ComponentFixture<EditDataDictionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDataDictionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDataDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
