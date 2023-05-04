export class Concept {
  id: string;
  conceptSetId: string;
  numericValue: number;
  omopConceptId: number;
  sortOrder: number = 0;
  defaultLabel: string;
  modified: Date;
  created: Date;
  modifiedBy: string;
  createdBy: string;
}
