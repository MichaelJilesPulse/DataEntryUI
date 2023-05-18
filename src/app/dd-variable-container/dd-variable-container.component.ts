import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DdVariable} from '../models/dd-variable/dd-variable';
import {ConceptSetRef} from '../models/concept/concept-set-ref';
import {FOLLOWUP_TYPES, LongitudinalType} from '../enums/longitudinal-type';
import {LongitudinalPeriod} from '../models/dd-variable/longitudinal-period';
import {DdVariableService} from '../services/dd-variable-service';
import {Constants} from '../constants/constants';
import {RespondentType} from '../enums/respondent-type';
import {RespondentTypeRef} from '../models/dd-variable/respondent-type-ref';

@Component({
  selector: 'app-dd-variable-container',
  templateUrl: './dd-variable-container.component.html',
  styleUrls: ['./dd-variable-container.component.scss']
})
export class DdVariableContainerComponent implements OnInit {

  @Input()
  variable: DdVariable = new DdVariable();

  longitudinalTypesEnum = LongitudinalType;

  longitudinalTypes = [
    LongitudinalType.START,
    LongitudinalType.END,
    LongitudinalType.SCREEN,
    LongitudinalType.REGISTRATION,
    LongitudinalType.FOLLOWUP,
    LongitudinalType.FOLLOWUP_END,
    LongitudinalType.START_FOLLOWUP_END
  ];
  respondentTypesEnum = RespondentType;
  respondentTypes = [
    RespondentType.participant,
    RespondentType.proxy,
    RespondentType.clinician,
    RespondentType.anyClinical,
    RespondentType.datafeed,
    RespondentType.greenlight,
    RespondentType.other,
    RespondentType.any
  ]
  formControlTypes = [
    'dropdown'
  ];
  storageTypes = [
    {tablename: 'overthere'}
  ];
  responseTypes = [
    'selection'
  ];

  name: FormControl = new FormControl('', Validators.required);
  variableName: FormControl = new FormControl('', Validators.required);
  assignedTo: FormControl = new FormControl('');
  id: FormControl = new FormControl('');
  originalId: FormControl = new FormControl('');
  published: FormControl = new FormControl('');
  respondentType = new FormControl<RespondentType[]>([]);
  longitudinalType = new FormControl<LongitudinalType | undefined>(undefined);
  longitudinalPeriods = new FormControl<LongitudinalPeriod[]>([]);
  conceptSetRefs = new FormControl<ConceptSetRef[]>([]);
  controlType: FormControl = new FormControl('');
  controlOptions: FormControl = new FormControl('');
  required: FormControl = new FormControl('');
  responseType: FormControl = new FormControl('');
  length: FormControl = new FormControl('');
  storage: FormControl = new FormControl('');
  initializer: FormControl = new FormControl('');
  prologue: FormControl = new FormControl('');
  epilogue: FormControl = new FormControl('');
  notes: FormControl = new FormControl('');

  form = this.fb.group({
    name: this.name,
    variableName: this.variableName,
    assignedTo: this.assignedTo,
    id: this.id,
    originalId: this.originalId,
    conceptSetRefs: this.conceptSetRefs,
    published: this.published,
    controlType: this.controlType,
    controlOptions: this.controlOptions,
    respondentType: this.respondentType,
    longitudinalType: this.longitudinalType,
    longitudinalPeriods: this.longitudinalPeriods,
    required: this.required,
    responseType: this.responseType,
    length: this.length,
    storage: this.storage
  });

  constructor(public fb: FormBuilder,
              public dialog: MatDialog,
              public ddVariableService: DdVariableService) { }

  ngOnInit(): void {

  }

  isFollowupType() {
    return FOLLOWUP_TYPES.some(type => type === this.longitudinalType.value);
  }

  buildDdVariable() : DdVariable{
    return {
      assignedTo: this.assignedTo.value,
      baseEpilogue: this.epilogue.value,
      baseInitializer: this.initializer.value,
      basePrologue: this.prologue.value,
      created: new Date(),
      formControlOptions: this.controlOptions.value,
      formControlType: this.controlType.value,
      id: this.id.value,
      localVariableName: this.variableName.value,
      longitudinalPeriods: this.longitudinalPeriods.value!,
      longitudinalType: this.longitudinalType.value!,
      respondentTypeRefs: this.getResponseTypes(),
      modified: new Date(),
      modifiedBy: Constants.userId,
      name: this.name.value,
      notes: this.notes.value,
      originalId: this.originalId.value,
      published: undefined,
      required: this.required.value ? 1 : 0,
      responseConceptSets: this.conceptSetRefs.value!,
      responseDataLength: this.length.value,
      responseDataType: this.responseType.value,
      storageLocation: this.storage.value
    };
  }

  create() {
    this.ddVariableService.createDDVariable(this.buildDdVariable()).subscribe(resp => console.log(resp));
  }

  onRespondentChange() {
    if (this.respondentType.value?.some(type => type === RespondentType.any)) {
      this.respondentType.setValue([RespondentType.any]);
    }
  }

  private getResponseTypes() : RespondentTypeRef[] {
    return this.respondentType.value!.map(type => {
      let currType = this.variable.respondentTypeRefs.find(ref => ref.respondentType === type);
      return {
        id: currType === undefined ? '' : currType.id,
        originalId: currType === undefined ? '' : currType.originalId,
        ddVariableId: this.variable.id,
        respondentType: type,
        modified: new Date(),
        created: currType === undefined ? new Date() : currType.created,
        modifiedBy: Constants.userId,
        createdBy: currType === undefined ? Constants.userId : currType.createdBy
      };
    })
  }
}
