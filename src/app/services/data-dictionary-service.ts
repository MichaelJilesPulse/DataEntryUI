import {Injectable} from '@angular/core';
import {ApiClient} from './api-client';

@Injectable({
  providedIn: 'root'
}) export class DataDictionaryService {

  private readonly servicePath = 'dict/';

  constructor(private apiClient: ApiClient) {
  }

  getDataDictionaries() {
    return this.apiClient.post(this.servicePath + 'get-all', null);
  }
}
