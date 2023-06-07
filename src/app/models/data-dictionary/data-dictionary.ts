import {DataDictionaryVariableRef} from './data-dictionary-variable-ref';
import {DdVariableRef} from '../dd-variable/dd-variable-ref';

export class DataDictionary {
  id: string = '';
  originalId: string;
  published: Date;
  name: string;
  regname: string;
  notes: string;
  assignedTo: string;
  copiedFromId: string;
  variables: DdVariableRef[] = [];
  created?: Date;
  modified?: Date;
  createdBy?: string;
  modifiedBy: string;
}
