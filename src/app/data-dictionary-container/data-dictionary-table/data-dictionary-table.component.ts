import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {DataDictionary} from '../../models/data-dictionary/data-dictionary';
import {DataDictionaryService} from '../../services/data-dictionary-service';
import {first} from 'rxjs';
import {Data} from '@angular/router';

@Component({
  selector: 'app-data-dictionary-table',
  templateUrl: './data-dictionary-table.component.html',
  styleUrls: ['./data-dictionary-table.component.scss']
})
export class DataDictionaryTableComponent implements OnInit, AfterViewInit {

  @Input()
  public set dataDictionaries(value: DataDictionary[]) {
    if (this.dictionaries === undefined) {
      this.dictionaries = new MatTableDataSource<DataDictionary>(value);
    } else {
      this.dictionaries.data = value;
    }
  }

  @Output()
  dictionaryEmitter = new EventEmitter<DataDictionary>();
  dictionaries: MatTableDataSource<DataDictionary>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = ['id', 'name', 'published' ];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.dictionaries.paginator = this.paginator;
  }

  selectDictionary(dict: DataDictionary) {
    this.dictionaryEmitter.emit(dict);
  }

}
