import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DdVariable} from '../models/dd-variable/dd-variable';
import {DdVariableService} from '../services/dd-variable-service';
import {MatDialog} from '@angular/material/dialog';
import {DdVariableContainerComponent} from '../dd-variable-container/dd-variable-container.component';

@Component({
  selector: 'app-dd-variable-picker',
  templateUrl: './dd-variable-picker.component.html',
  styleUrls: ['./dd-variable-picker.component.scss']
})
export class DdVariablePickerComponent implements OnInit {

  ddVariables: DdVariable[];
  selectedVariables: DdVariable[] = [];
  @Input()
  public multiSelect: boolean = true;
  @Output()
  public selectedVariablesEmitter = new EventEmitter<DdVariable[]>();

  constructor(public variableService: DdVariableService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.variableService.getAllDataVariables().subscribe(resp => this.ddVariables = resp);
  }

  editVariable(variable: DdVariable) {
    this.dialog.open(DdVariableContainerComponent, {
      data: variable,
      width: '95vw',
      height: '90vh'
    });
  }

  selectVariable(variable: DdVariable) {
    if (this.selectedVariables.some(currVar => currVar.id === variable.id)) {
      this.selectedVariables = this.selectedVariables.filter(currVar => currVar.id !== variable.id);
    } else {
      this.selectedVariables.push(variable);
    }
    this.selectedVariablesEmitter.emit(this.selectedVariables);
  }

  createVariable() {
    this.dialog.open(DdVariableContainerComponent, {
      data: null,
      width: '95vw',
      height: '90vh'
    });
  }

}
