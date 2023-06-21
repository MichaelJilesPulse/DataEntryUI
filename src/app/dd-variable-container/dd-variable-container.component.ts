import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DdVariable} from '../models/dd-variable/dd-variable';
import {ConceptSetRef} from '../models/concept/concept-set-ref';
import {FOLLOWUP_TYPES, LongitudinalType} from '../enums/longitudinal-type';
import {LongitudinalPeriod} from '../models/dd-variable/longitudinal-period';
import {DdVariableService} from '../services/dd-variable-service';
import {Constants} from '../constants/constants';
import {RespondentType} from '../enums/respondent-type';
import {RespondentTypeRef} from '../models/dd-variable/respondent-type-ref';
import {CanonicalDataService} from '../services/canonical-data-service';
import {StorageLocation} from '../models/dd-variable/storage-location';
import {FormControlType} from '../models/dd-variable/form-control-type';
import {AppConstants} from '../models/constants/app-constants';

@Component({
  selector: 'app-dd-variable-container',
  templateUrl: './dd-variable-container.component.html',
  styleUrls: ['./dd-variable-container.component.scss']
})
export class DdVariableContainerComponent implements OnInit {

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
  formControlTypes: FormControlType[] = [];
  storageLocations: StorageLocation[] = [];
  responseTypes = AppConstants.RESPONSE_TYPES;

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
    storage: this.storage,
    initializer: this.initializer,
    prologue: this.prologue,
    epilogue: this.epilogue,
    notes: this.notes
  });

  constructor(public fb: FormBuilder,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<DdVariableContainerComponent>,
              public ddVariableService: DdVariableService,
              public dataService: CanonicalDataService,
              @Inject(MAT_DIALOG_DATA) public variable: DdVariable) { }

  ngOnInit(): void {
    this.id.disable();
    this.originalId.disable();
    this.published.disable();

    this.dataService.getStorageLocations().subscribe(locations => this.storageLocations = locations);
    this.dataService.getFormControlTypes().subscribe(types => this.formControlTypes = types);

    if (this.variable !== null && this.variable !== undefined) {
      this.ddVariableService.getDataVariable({id: this.variable.id}).subscribe(variable => {
        this.variable = variable;
        this.name.setValue(this.variable.name);
        this.variableName.setValue(this.variable.localVariableName);
        this.assignedTo.setValue(this.variable.assignedTo);
        this.id.setValue(this.variable.id);
        this.originalId.setValue(this.variable.originalId);
        this.conceptSetRefs.setValue(this.variable.responseConceptSets);
        this.published.setValue(this.variable.published);
        this.controlType.setValue(this.variable.formControlType);
        this.controlOptions.setValue(this.variable.formControlOptions);
        this.respondentType.setValue(this.variable.respondentTypeRefs?.map(ref => ref.respondentType));
        this.longitudinalType.setValue(this.variable.longitudinalType as LongitudinalType);
        this.longitudinalPeriods.setValue(this.variable.longitudinalPeriods);
        this.required.setValue(this.variable.required);
        this.responseType.setValue(this.variable.responseDataType);
        this.length.setValue(this.variable.responseDataLength);
        this.storage.setValue(this.variable.storageLocation);
        this.initializer.setValue(this.variable.baseInitializer);
        this.prologue.setValue(this.variable.basePrologue);
        this.epilogue.setValue(this.variable.baseEpilogue);
        this.notes.setValue(this.variable.notes);
        this.storage.setValue(this.variable.storageLocation?.tablename);
        this.conceptSetRefs.setValue(this.variable.responseConceptSets);
        this.controlType.setValue(this.variable.formControlType);
      });
    } else {
      this.variable = new DdVariable();
    }
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
      formControlOptions: this.controlOptions.value,
      formControlType: this.controlType.value,
      id: this.id.value,
      localVariableName: this.variableName.value,
      longitudinalPeriods: this.longitudinalPeriods.value!,
      longitudinalType: this.longitudinalType.value!,
      respondentTypeRefs: this.getResponseTypes(),
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

  createValid() {
    return this.id.value === '' && this.form.valid;
  }

  updateValid() {
    return this.id.value !== '' && this.form.valid;
  }

  publishValid() {
    return this.published.value === null && this.id.value !== '' && this.form.valid;
  }

  create() {
    this.ddVariableService.createDDVariable(this.buildDdVariable()).subscribe(resp => this.dialogRef.close(resp));
  }

  update() {
    let req = this.buildDdVariable();
    req.createdBy = this.variable.createdBy;
    this.ddVariableService.updateDDVariable(req).subscribe(resp => this.dialogRef.close(resp));
  }

  createNewVersion() {
    let req = this.buildDdVariable();
    this.ddVariableService.createNewDDVariableVersion(req).subscribe(resp => this.dialogRef.close(resp));
  }

  clone() {
    let req = this.buildDdVariable();
    this.ddVariableService.cloneDDVariable(req).subscribe(resp => this.dialogRef.close(resp));
  }

  publish() {
    let req = this.buildDdVariable();
    this.ddVariableService.publish(req).subscribe(resp => this.dialogRef.close(resp));
  }

  onRespondentChange() {
    if (this.respondentType.value?.some(type => type === RespondentType.any)) {
      this.respondentType.setValue([RespondentType.any]);
    }
  }

  private getResponseTypes() : RespondentTypeRef[] {
    return this.respondentType.value!.map(type => {
      let currType : RespondentTypeRef | undefined = this.variable.respondentTypeRefs.find(ref => ref.respondentType === type);
      currType = currType === undefined ? new RespondentTypeRef() : currType;
      return {
        id: currType.id,
        originalId: currType.originalId,
        ddVariableId: this.variable.id,
        respondentType: type,
        modifiedBy: Constants.userId,
        modified: currType.modified,
        created: currType.created,
        createdBy: currType.createdBy
      };
    })
  }
}
