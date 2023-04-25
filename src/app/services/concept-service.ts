import {Injectable} from '@angular/core';
import {ApiClient} from './api-client';

@Injectable({
  providedIn: 'root'
}) export class ConceptService {

  private readonly servicePath = 'concept-set/';

  constructor(private apiClient: ApiClient) {
  }

  getConceptSetsForPicker() {
    return this.apiClient.post(this.servicePath + 'get-sets', null);
  }
}
