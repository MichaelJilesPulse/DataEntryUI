import {LookupItem} from '../lookup/lookup-item';

export class Concept {
  id: string;
  conceptSetId: string;
  numericValue: number;
  omopConceptId: string;
  sortOrder: number = 0;
  defaultLabel: string;
  modified: Date;
  created: Date;
  modifiedBy: string;
  createdBy: string;

  constructor(item: LookupItem) {
    this.numericValue = 0;
    this.omopConceptId = item.omopConceptId;
    this.defaultLabel = item.name;
  }
}
