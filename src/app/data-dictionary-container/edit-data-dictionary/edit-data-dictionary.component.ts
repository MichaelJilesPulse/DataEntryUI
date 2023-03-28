import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataDictionary} from '../../models/data-dictionary/data-dictionary';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

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

  form = this.fb.group({
    id: this.id,
    name: this.name,
    variableRefs: this.fb.array([])
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.dictionary !== undefined) {
      this.id.setValue(this.dictionary.id);
      this.name.setValue(this.name);
    }
  }

  save() {
    this.onSave.emit();
  }



}
