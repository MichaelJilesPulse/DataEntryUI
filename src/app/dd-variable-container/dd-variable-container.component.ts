import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ConceptSetPickerComponent} from '../concept-set-container/concept-set-picker/concept-set-picker.component';
import {DdVariable} from '../models/dd-variable/dd-variable';
import {ConceptSetRef} from '../models/concept/concept-set-ref';

@Component({
  selector: 'app-dd-variable-container',
  templateUrl: './dd-variable-container.component.html',
  styleUrls: ['./dd-variable-container.component.scss']
})
export class DdVariableContainerComponent implements OnInit {

  @Input()
  variable: DdVariable = new DdVariable();

  name: FormControl = new FormControl('', Validators.required);
  variableName: FormControl = new FormControl('', Validators.required);
  assignedTo: FormControl = new FormControl('');
  id: FormControl = new FormControl('');
  originalId: FormControl = new FormControl('');
  published: FormControl = new FormControl('');
  conceptSetRefs: FormControl = new FormControl([]);
  controlType: FormControl = new FormControl('');
  controlOptions: FormControl = new FormControl('');
  required: FormControl = new FormControl('');
  responseType: FormControl = new FormControl('');
  length: FormControl = new FormControl('');
  storage: FormControl = new FormControl('');
  initializer: FormControl = new FormControl('');
  prologue: FormControl = new FormControl('');
  epilogue: FormControl = new FormControl('');
  notes: FormControl = new FormControl('');

  constructor(public fb: FormBuilder,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fb.group({
      name: this.name,
      variableName: this.variableName,
      assignedTo: this.assignedTo,
      id: this.id,
      originalId: this.originalId,
      published: this.published,
      controlType: this.controlType,
      controlOptions: this.controlOptions,
      required: this.required,
      responseType: this.responseType,
      length: this.length,
      storage: this.storage
    });
  }

  updateConceptSetRefs($event: ConceptSetRef[]) {
    this.variable.responseConceptSets = $event.map(ref => { return {...ref, ddVariableId: this.variable.id}});
  }
}
