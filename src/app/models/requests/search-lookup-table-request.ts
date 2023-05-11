import {LookupTable} from '../lookup/lookup-table';

export class SearchLookupTableRequest {
  table: LookupTable;
  searchQuery: string;
  itemRequested: number;
  currentPage: number;
}
