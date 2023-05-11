import {Injectable} from '@angular/core';
import {ApiClient} from './api-client';
import {LookupTable} from '../models/lookup/lookup-table';
import {Observable, take} from 'rxjs';
import {Concept} from '../models/concept/concept';
import {LookupItem} from '../models/lookup/lookup-item';
import {SearchLookupTableRequest} from '../models/requests/search-lookup-table-request';
import {LookupResultsSet} from '../models/lookup/looup-results-set';

@Injectable({
  providedIn: 'root'
}) export class LookupService {
  private readonly servicePath = 'lookup/';

  constructor(private apiClient: ApiClient) {}

  getLookupTables() : Observable<LookupTable[]> {
    return this.apiClient.post(this.servicePath + 'get-tables', null).pipe(take(1));
  }

  getLookupItems(req: SearchLookupTableRequest) : Observable<LookupResultsSet> {
    return this.apiClient.post(this.servicePath + 'get-items', req).pipe(take(1));
  }
}
