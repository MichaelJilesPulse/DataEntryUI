import {StorageLocation} from './storage-location';
import {ConceptSetRef} from '../concept/concept-set-ref';

export class DdVariable {
  id: string;
  originalId: string;
  name: string;
  storageLocation: StorageLocation;
  // longitudinalType
  // longitudinalPeriods
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
  published: Date;
  assignedTo: string;
  modified: Date;
  created: Date;
  modifiedBy: string;
}
