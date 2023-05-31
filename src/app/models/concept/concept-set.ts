import {Concept} from './concept';

export class ConceptSet {
  id: string;
  originalId: string;
  name: string;
  conceptSetType?: string;
  lookupTable: string;
  description: string;
  sortType: string;
  items: Concept[];
  published: Date;
  assignedTo: string;
  modified?: Date;
  created?: Date;
  modifiedBy: string;
  createdBy?: string;
}
