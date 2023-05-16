import {ConceptSet} from './concept-set';

export class ConceptSetRef {
  id: string;
  conceptSet: ConceptSet;
  ddVariableId: string;
  omopConceptId: string;
  publiched: Date;
  modifiedBy: string;
  createdBy: string;
  created: Date;
  modified: Date;
}
