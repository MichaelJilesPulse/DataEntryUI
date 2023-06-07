import {DdVariable} from './dd-variable';

export class DdVariableRef {
  id: string;
  dataDictionaryId: string;
  ddVariableId: string;
  name: string;
  sortPos: number;
  created?: Date;
  createdBy?: string;
  modified?: string;
  modifiedBy: string;
}
