import {Component, OnInit, ViewChild} from '@angular/core';
import {DataDictionaryService} from '../services/data-dictionary-service';
import {first} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {DataDictionary} from '../models/data-dictionary/data-dictionary';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-data-dictionary-container',
  templateUrl: './data-dictionary-container.component.html',
  styleUrls: ['./data-dictionary-container.component.scss']
})
export class DataDictionaryContainerComponent implements OnInit {

  public dictionaries: DataDictionary[];
  editingDictionary = true;

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

  onSave() {
    console.log("save");
    this.editingDictionary = false;
  }

}
