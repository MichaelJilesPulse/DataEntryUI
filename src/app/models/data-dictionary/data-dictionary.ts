import {DataDictionaryVariableRef} from './data-dictionary-variable-ref';

export class DataDictionary {
  id: string;
  originalId: string;
  published: Date;
  name: string;
  variableRefs: DataDictionaryVariableRef[] = [];
}
