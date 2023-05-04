import {Injectable} from '@angular/core';
import {ApiClient} from './api-client';
import {LookupTable} from '../models/lookup/lookup-table';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
}) export class LookupService {
  private readonly servicePath = 'lookup/';

  constructor(private apiClient: ApiClient) {}

  getLookupTables() : Observable<LookupTable[]> {
    return this.apiClient.post(this.servicePath + 'get-tables', null);
  }
}
