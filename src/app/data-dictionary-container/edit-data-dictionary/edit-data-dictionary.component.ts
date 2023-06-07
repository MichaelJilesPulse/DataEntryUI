import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DataDictionary} from '../../models/data-dictionary/data-dictionary';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {DataDictionaryVariableRef} from '../../models/data-dictionary/data-dictionary-variable-ref';
import {DataDictionaryService} from '../../services/data-dictionary-service';
import {DdVariable} from '../../models/dd-variable/dd-variable';
import {AlertDialogComponent} from '../../utilities/alert-dialog/alert-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {DdVariableRef} from '../../models/dd-variable/dd-variable-ref';
import {Constants} from '../../constants/constants';
import {CrudActions} from '../../enums/crud-actions';

@Component({
  selector: 'app-edit-data-dictionary',
  templateUrl: './edit-data-dictionary.component.html',
  styleUrls: ['./edit-data-dictionary.component.scss']
})
export class EditDataDictionaryComponent implements OnInit, OnDestroy{

  @Output()
  onSave = new EventEmitter<{dictionary: DataDictionary, action: CrudActions}>();
  @Input()
  dictionary: DataDictionary;

  actions = CrudActions;

  id: FormControl = new FormControl('');
  name: FormControl = new FormControl('', Validators.required);
  regName: FormControl = new FormControl('');
  notes: FormControl = new FormControl('');
  assignedTo: FormControl = new FormControl('');
  originalId: FormControl = new FormControl('');
  copiedFrom: FormControl = new FormControl('');
  published: FormControl = new FormControl('');

  variableRefs = new FormControl<DdVariableRef[]>([]);

  form = this.fb.group({
    id: this.id,
    name: this.name,
    regName: this.regName,
    notes: this.notes,
    assignedTo: this.assignedTo,
    originalId: this.originalId,
    copiedFrom: this.copiedFrom,
    published: this.published,
    variableRefs: this.variableRefs
  });

  constructor(private fb: FormBuilder,
              public dictionaryService: DataDictionaryService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.id.disable();
    this.originalId.disable();
    this.copiedFrom.disable();
    this.published.disable();
    if (this.dictionary.id !== '') {
      this.dictionaryService.getDataDictionary({id: this.dictionary.id}).subscribe(dict => {
        this.dictionary = dict;
        console.log(this.dictionary);
        this.id.setValue(this.dictionary.id);
        this.name.setValue(this.dictionary.name);
        this.regName.setValue(this.dictionary.regname);
        this.notes.setValue(this.dictionary.notes);
        this.assignedTo.setValue(this.dictionary.assignedTo);
        this.originalId.setValue(this.dictionary.originalId);
        this.copiedFrom.setValue(this.dictionary.copiedFromId);
        this.published.setValue(this.dictionary.published);
        this.variableRefs.setValue(this.dictionary.variables);
      })
    } else {
      this.dictionary = new DataDictionary();
    }
  }

  emit(action: CrudActions) {
    this.onSave.emit({dictionary: this.buildDictionary(), action});
  }

  refsChanged(refs: any) {
    this.variableRefs.setValue(refs);
    this.variableRefs.updateValueAndValidity();
  }

  onCancel() {
    this.onSave.emit(undefined);
  }

  buildDictionary(): DataDictionary {
    return {
      id: this.dictionary.id,
      originalId: this.originalId.value,
      assignedTo: this.assignedTo.value,
      copiedFromId: this.copiedFrom.value,
      name: this.name.value,
      notes: this.notes.value,
      published: new Date(),
      regname: this.regName.value,
      variables: this.variableRefs.value!,
      created: this.dictionary.created,
      modified: this.dictionary.modified,
      createdBy: this.dictionary.createdBy,
      modifiedBy: Constants.userId
    };
  }

  ngOnDestroy() {
    this.id.setValue('');
    this.name.setValue('');
    this.regName.setValue('');
    this.notes.setValue('');
    this.assignedTo.setValue('');
    this.originalId.setValue('');
    this.copiedFrom.setValue('');
    this.published.setValue('');
    this.variableRefs.setValue([]);
  }
}
