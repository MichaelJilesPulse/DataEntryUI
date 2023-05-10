import {Injectable} from '@angular/core';
import {ApiClient} from './api-client';
import {ConceptSet} from '../models/concept/concept-set';
import {Concept} from '../models/concept/concept';
import {IdRequest} from '../models/requests/id-request';
import {Observable, take} from 'rxjs';

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
    return this.apiClient.post(this.servicePath + 'get-items', set).pipe(take(1));
  }

  createConceptSet(set: ConceptSet) {
    return this.apiClient.post(this.servicePath + 'create', set).pipe(take(1));
  }

  updateConceptSet(set: ConceptSet) {
    return this.apiClient.post(this.servicePath + 'update', set).pipe(take(1));
  }

  createNewConceptSetVersion(set: ConceptSet) {
    return this.apiClient.post(this.servicePath + 'create-new-version', set).pipe(take(1));
  }

  cloneConceptSet(set: ConceptSet) {
    return this.apiClient.post(this.servicePath + 'clone', set).pipe(take(1));
  }
}
