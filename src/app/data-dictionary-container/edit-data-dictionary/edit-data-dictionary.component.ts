import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataDictionary} from '../../models/data-dictionary/data-dictionary';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {DataDictionaryVariableRef} from '../../models/data-dictionary/data-dictionary-variable-ref';

@Component({
  selector: 'app-edit-data-dictionary',
  templateUrl: './edit-data-dictionary.component.html',
  styleUrls: ['./edit-data-dictionary.component.scss']
})
export class EditDataDictionaryComponent implements OnInit {

  @Output()
  onSave = new EventEmitter<DataDictionary>();
  @Input()
  dictionary: DataDictionary;

  id: FormControl = new FormControl('', Validators.required);
  name: FormControl = new FormControl('', Validators.required);
  variableRefs = new FormControl<DataDictionaryVariableRef[]>([], Validators.required);

  form = this.fb.group({
    id: this.id,
    name: this.name,
    variableRefs: this.variableRefs
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.dictionary !== undefined) {
      this.id.setValue(this.dictionary.id);
      this.name.setValue(this.name);
    } else {
      this.dictionary = new DataDictionary();
      this.dictionary.id = 'dictID';
      this.dictionary.name = 'dictname';
      this.dictionary.variableRefs.push({
        dataDictionaryId: this.dictionary.id,
        id: 'refOneId',
        sortPos: 1,
        ddVariableId: 'ddVarOneId'
      });
      this.dictionary.variableRefs.push({
        dataDictionaryId: this.dictionary.id,
        id: 'refTwoId',
        sortPos: 2,
        ddVariableId: 'ddVarTwoId'
      });
    }
  }

  save() {
    this.onSave.emit();
  }

  refsChanged(refs: any) {
    this.variableRefs.setValue(refs);
    this.variableRefs.updateValueAndValidity();
  }

}
