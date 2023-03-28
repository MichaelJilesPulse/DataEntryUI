import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataDictionary} from '../../models/data-dictionary/data-dictionary';

@Component({
  selector: 'app-edit-data-dictionary',
  templateUrl: './edit-data-dictionary.component.html',
  styleUrls: ['./edit-data-dictionary.component.scss']
})
export class EditDataDictionaryComponent implements OnInit {

  @Output()
  onSave = new EventEmitter<DataDictionary>();

  constructor() { }

  ngOnInit(): void {
  }

  save() {
    this.onSave.emit();
  }



}
