import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {LongitudinalPeriod} from '../../models/dd-variable/longitudinal-period';
import {Constants} from '../../constants/constants';

@Component({
  selector: 'app-longitudinal-period-manager',
  templateUrl: './longitudinal-period-manager.component.html',
  styleUrls: ['./longitudinal-period-manager.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: LongitudinalPeriodManagerComponent,
      multi: true
    }
  ]
})
export class LongitudinalPeriodManagerComponent implements OnInit, ControlValueAccessor {

  @Input()
  periods: LongitudinalPeriod[] = [];

  onChange = (periods: LongitudinalPeriod[]) => {};
  onTouch = () => {};
  touched = false;
  disabled = false;

  units = ['day', 'week', 'month', 'year'];

  period = new FormControl<number>(1, [Validators.required, Validators.min(1)]);
  unit = new FormControl('', Validators.required);

  longitudinalForm = this.fb.group({
    period: this.period,
    unit: this.unit
  });

  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(obj: any): void {
    this.periods = obj;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  addPeriod() {
    this.markAsTouched();
    if (!this.disabled) {
      this.periods.push({
        period: this.period.value!,
        created: new Date(),
        createdBy: Constants.userId,
        modified: new Date(),
        modifiedBy: Constants.userId,
        unit: this.unit.value!
      });

      this.onChange(this.periods);
    }
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouch();
      this.touched = true;
    }
  }

}
