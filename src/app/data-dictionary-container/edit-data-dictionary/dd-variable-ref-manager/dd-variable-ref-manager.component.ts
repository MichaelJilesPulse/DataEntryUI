import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DataDictionaryVariableRef} from '../../../models/data-dictionary/data-dictionary-variable-ref';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

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

  @Output()
  ddVariablesEmitter = new EventEmitter<DataDictionaryVariableRef[]>();
  @Input()
  ddVariables: DataDictionaryVariableRef[] | undefined = [];

  constructor() { }

  ngOnInit(): void {
    this.ddVariablesEmitter.emit(this.ddVariables);
  }

  registerOnChange(fn: any): void {
    this.ddVariablesEmitter.emit(this.ddVariables);
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.ddVariables!, event.previousIndex, event.currentIndex);
  }

}
