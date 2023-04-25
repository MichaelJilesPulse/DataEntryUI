import {DataDictionaryVariableRef} from './data-dictionary-variable-ref';

export class DataDictionary {
  id: string;
  originalid: string;
  published: Date;
  name: string;
  variableRefs: DataDictionaryVariableRef[] = [];
}
