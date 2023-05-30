import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ConceptSet} from '../../models/concept/concept-set';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import {EditConceptSetDialogComponent} from '../edit-concept-set-dialog/edit-concept-set-dialog.component';
import {ConceptSetRef} from '../../models/concept/concept-set-ref';
import {Constants} from '../../constants/constants';
import {ConceptSetPickerComponent} from '../concept-set-picker/concept-set-picker.component';
import {take} from 'rxjs';

@Component({
  selector: 'app-concept-set-ref-manager',
  templateUrl: './concept-set-ref-manager.component.html',
  styleUrls: ['./concept-set-ref-manager.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ConceptSetRefManagerComponent,
      multi: true
    }
  ]
})
export class ConceptSetRefManagerComponent implements OnInit, ControlValueAccessor {

  @Input()
  conceptSets: ConceptSetRef[] = [];

  onChange = (conceptSets: ConceptSetRef[]) => {};
  onTouch = () => {};
  touched = false;
  disabled = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(obj: any): void {
    this.conceptSets = obj;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  openConceptSetViewer(set: ConceptSet) {
    this.dialog.open(EditConceptSetDialogComponent, {
      width: '90vw',
      height: '90vh',
      data: set
    });
  }

  pickConceptSet() {
    const ref = this.dialog.open(ConceptSetPickerComponent, {
      width: '1000px',
      height: '500px'
    });

    ref.afterClosed().pipe(take(1)).subscribe(ref => {
      this.markAsTouched();
      if (!this.disabled && ref !== undefined && ref !== null) {
        this.conceptSets.push({
          id: '',
          conceptSet: ref,
          ddVariableId: '',
          omopConceptId: '',
          published: undefined,
          modifiedBy: Constants.userId,
          createdBy: Constants.userId,
          created: new Date(),
          modified: new Date()
        });
        this.onChange(this.conceptSets);
      }
    });
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouch();
      this.touched = true;
    }
  }

}
