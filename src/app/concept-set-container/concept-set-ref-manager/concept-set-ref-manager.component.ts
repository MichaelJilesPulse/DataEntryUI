import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';
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
  styleUrls: ['./concept-set-ref-manager.component.scss']
})
export class ConceptSetRefManagerComponent implements OnInit, ControlValueAccessor {

  @Input()
  conceptSets: ConceptSetRef[] = [];

  @Output()
  conceptSetsEmitter = new EventEmitter<ConceptSetRef[]>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    this.conceptSetsEmitter.emit(this.conceptSets);
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
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
    });
  }

}
