import {Injectable} from '@angular/core';
import {ApiClient} from './api-client';
import {IdRequest} from '../models/requests/id-request';
import {Observable, take} from 'rxjs';
import {DataDictionary} from '../models/data-dictionary/data-dictionary';

@Injectable({
  providedIn: 'root'
}) export class DataDictionaryService {

  private readonly servicePath = 'dict/';

  constructor(private apiClient: ApiClient) {
  }

  getDataDictionaries() {
    return this.apiClient.post(this.servicePath + 'get-all', null);
  }

  getDataDictionary(req: IdRequest) : Observable<DataDictionary> {
    return this.apiClient.post(this.servicePath + 'get', req).pipe(take(1));
  }

  createDataDictionary(req: DataDictionary) : Observable<DataDictionary> {
    return this.apiClient.post(this.servicePath + 'create', req).pipe(take(1));
  }

  cloneDataDictionary(req: DataDictionary) : Observable<DataDictionary> {
    return this.apiClient.post(this.servicePath + 'clone', req).pipe(take(1));
  }

  newVersionDataDictionary(req: DataDictionary) : Observable<DataDictionary> {
    return this.apiClient.post(this.servicePath + 'create-new-version', req).pipe(take(1));
  }

  updateDataDictionary(req: DataDictionary) : Observable<DataDictionary> {
    return this.apiClient.post(this.servicePath + 'update', req).pipe(take(1));
  }

  publishDataDictionary(req: DataDictionary) : Observable<DataDictionary> {
    return this.apiClient.post(this.servicePath + 'publish', req).pipe(take(1));
  }
}
