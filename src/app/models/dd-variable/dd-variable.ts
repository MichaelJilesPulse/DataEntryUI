import {StorageLocation} from './storage-location';
import {ConceptSetRef} from '../concept/concept-set-ref';
import {LongitudinalType} from '../../enums/longitudinal-type';
import {LongitudinalPeriod} from './longitudinal-period';

export class DdVariable {
  id: string;
  originalId: string;
  name: string;
  storageLocation: StorageLocation;
  longitudinalType: LongitudinalType
  longitudinalPeriods: LongitudinalPeriod[] = [];
  localVariableName: string;
  required: number;
  formControlType: string;
  formControlOptions: string;
  responseConceptSets: ConceptSetRef[] = [];
  responseDataType: string;
  responseDataLength: number;
  baseInitializer: string;
  basePrologue: string;
  baseEpilogue: string;
  notes: string;
  published?: Date;
  assignedTo: string;
  modified: Date;
  created: Date;
  modifiedBy: string;
}
