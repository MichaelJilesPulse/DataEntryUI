import {Component, OnInit} from '@angular/core';
import {DataDictionaryService} from '../services/data-dictionary-service';
import {first} from 'rxjs';
import {DataDictionary} from '../models/data-dictionary/data-dictionary';
import {CrudActions} from '../enums/crud-actions';

@Component({
  selector: 'app-data-dictionary-container',
  templateUrl: './data-dictionary-container.component.html',
  styleUrls: ['./data-dictionary-container.component.scss']
})
export class DataDictionaryContainerComponent implements OnInit {

  public dictionaries: DataDictionary[];
  editingDictionary = false;
  selectedDictionary = new DataDictionary();

  constructor(private dictService: DataDictionaryService) { }

  ngOnInit(): void {
    this.dictService.getDataDictionaries()
      .pipe(first(req => req != null))
      .subscribe(resp => {
        this.dictionaries = resp;
      });
  }

  onCreate() {
    this.editingDictionary = true;
  }

  onCloseEdit(event: {dictionary: DataDictionary, action: CrudActions}) {
    if (event !== undefined && event.dictionary !== undefined) {
      switch (event.action) {
        case CrudActions.CREATE:
          this.dictService.createDataDictionary(event.dictionary).subscribe(dictionary => console.log(dictionary));
          break;
        case CrudActions.CLONE:
          this.dictService.cloneDataDictionary(event.dictionary).subscribe(dictionary => console.log(dictionary));
          break;
        case CrudActions.NEW_VERSION:
          this.dictService.newVersionDataDictionary(event.dictionary).subscribe(dictionary => console.log(dictionary));
          break;
        case CrudActions.UPDATE:
          this.dictService.updateDataDictionary(event.dictionary).subscribe(dictionary => console.log(dictionary));
          break;
        case CrudActions.PUBLISH:
          this.dictService.publishDataDictionary(event.dictionary).subscribe(dictionary => console.log(dictionary));
          break;
        default:
          break;
      }
    }
    this.editingDictionary = false;
  }

  onSelectDict($event: DataDictionary) {
    this.editingDictionary = true;
    this.selectedDictionary = $event;
  }
}
