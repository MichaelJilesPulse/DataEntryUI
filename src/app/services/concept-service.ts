import {Injectable} from '@angular/core';
import {ApiClient} from './api-client';
import {ConceptSet} from '../models/concept/concept-set';
import {Concept} from '../models/concept/concept';
import {IdRequest} from '../models/requests/id-request';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
}) export class ConceptService {

  private readonly servicePath = 'concept-set/';

  constructor(private apiClient: ApiClient) {
  }

  getConceptSetsForPicker() : Observable<ConceptSet[]> {
    return this.apiClient.post(this.servicePath + 'get-sets', null);
  }

  getConceptSet(set: IdRequest) : Observable<Concept[]> {
    return this.apiClient.post(this.servicePath + 'get-items', set);
  }
}
