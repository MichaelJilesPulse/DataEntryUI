import {Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DataDictionaryVariableRef} from '../../../models/data-dictionary/data-dictionary-variable-ref';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {DdVariableRef} from '../../../models/dd-variable/dd-variable-ref';
import {DdVariableService} from '../../../services/dd-variable-service';
import {DataDictionaryService} from '../../../services/data-dictionary-service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {SelectableItem} from '../../../models/ui/selectable-item';
import {AlertDialogComponent} from '../../../utilities/alert-dialog/alert-dialog.component';
import {DdVariable} from '../../../models/dd-variable/dd-variable';
import {MatDialog} from '@angular/material/dialog';
import {Constants} from '../../../constants/constants';

@Component({
  selector: 'app-dd-variable-ref-manager',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DdVariableRefManagerComponent),
      multi: true
    }
  ],
  templateUrl: './dd-variable-ref-manager.component.html',
  styleUrls: ['./dd-variable-ref-manager.component.scss']
})
export class DdVariableRefManagerComponent implements OnInit, ControlValueAccessor {

  @Input()
  ddVariables: DdVariableRef[] = [];

  selectedVariableRefs: DdVariableRef[] = [];
  selectedVariables: DdVariable[] = [];

  dataSource = new MatTableDataSource<SelectableItem<DdVariableRef>>();
  column = ['selected', 'id', 'name', 'sortPos'];

  @ViewChild('variableSort') variableSort: MatSort;

  onChange = (periods: DdVariableRef[]) => {};
  onTouch = () => {};
  touched = false;
  disabled = false;


  constructor(public dictionaryService: DataDictionaryService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.buildDataSource();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(obj: any): void {
    this.ddVariables = obj;
    this.buildDataSource();
  }

  onListDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dataSource.data, event.previousIndex, event.currentIndex);
    this.dataSource.data = [...this.dataSource.data];
  }

  assignOrder() {
    this.dataSource.sortData(this.dataSource.data, this.dataSource.sort!)
      .forEach((variable, index) => {
        variable.value.sortPos = index
      });
    this.refreshTableSort();
  }

  refreshTableSort() {
    this.dataSource.data = this.dataSource.sortData(this.dataSource.data, this.dataSource.sort!);
  }

  selectAllVariables(event: any) {
    this.dataSource.data.forEach(item => {
      item.selected = event.checked;
      this.selectVariable(item);
    })
  }

  selectVariable(event: SelectableItem<DdVariableRef>) {
    const item = event.value;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouch();
      this.touched = true;
    }
  }

  addDdVariables() {
    if (this.selectedVariables.length == 0) {
      this.dialog.open(AlertDialogComponent, {
        data: 'Please select items to add from the variable table on the right'
      });
    } else {
      this.selectedVariables.forEach(variable => {
        let max = this.ddVariables.length;
        if (!this.ddVariables.some(thing => thing.ddVariableId === variable.id)) {
          this.ddVariables.push({
            id: '',
            dataDictionaryId: '',
            ddVariableId: variable.id,
            name: variable.name,
            sortPos: max,
            modifiedBy: Constants.userId
          });
          max++;
        }
      });
    }
    this.writeValue(this.ddVariables);

    console.log(this.ddVariables)
  }

  buildDataSource() {
    this.dataSource = new MatTableDataSource<SelectableItem<DdVariableRef>>(
      this.ddVariables.map(variable => new SelectableItem<DdVariableRef>(variable)));
    this.dataSource.sort = this.variableSort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'id': return item.value.ddVariableId;
        case 'name': return item.value.name;
        case 'sortPos': return item.value.sortPos;
        default: return item.value.sortPos;
      }
    }
  }

  removeDdVariable() {
    this.writeValue(this.dataSource.data.filter(variable => !variable.selected).map(variable => variable.value));
  }

}
