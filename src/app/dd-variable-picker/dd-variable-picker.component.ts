import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DdVariable} from '../models/dd-variable/dd-variable';
import {DdVariableService} from '../services/dd-variable-service';
import {MatDialog} from '@angular/material/dialog';
import {DdVariableContainerComponent} from '../dd-variable-container/dd-variable-container.component';
import {take} from 'rxjs';

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
    const ref = this.dialog.open(DdVariableContainerComponent, {
      data: variable,
      width: '95vw',
      height: '90vh'
    });
    ref.afterClosed().pipe(take(1)).subscribe(resp => {
      if (resp !== undefined) {
        this.updateDdVariables(resp);
      }
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
    const ref = this.dialog.open(DdVariableContainerComponent, {
      data: null,
      width: '95vw',
      height: '90vh'
    });

    ref.afterClosed().pipe(take(1)).subscribe(resp => {
      if (resp !== undefined) {
        this.updateDdVariables(resp);
      }
    });
  }

  updateDdVariables(req: DdVariable) {
    const index = this.ddVariables.findIndex(variable => variable.id = req.id);
    if (index !== -1) {
      this.ddVariables[index] = req;
    } else {
      this.ddVariables.push(req);
    }
    this.ddVariables = [...this.ddVariables];
  }

}
