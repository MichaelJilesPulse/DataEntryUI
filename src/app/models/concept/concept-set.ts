import {Concept} from './concept';

export class ConceptSet {
  id: string;
  originalId: string;
  name: string;
  conceptSetType: string;
  omopConceptId: string;
  lookupTable: string;
  description: string;
  sortType: string;
  concepts: Concept[];
  published: Date;
  assignedTo: string;
  modified: Date;
  created: Date;
  modifiedBy: string;
  createdBy: string;
  deleted: string;
}
