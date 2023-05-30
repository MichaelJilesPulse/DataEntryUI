import {Injectable} from '@angular/core';
import {ApiClient} from './api-client';
import {take} from 'rxjs';
import {IdRequest} from '../models/requests/id-request';
import {DdVariable} from '../models/dd-variable/dd-variable';

@Injectable({
  providedIn: 'root'
}) export class DdVariableService {

  private readonly servicePath = 'ddvariable/';

  constructor(private apiClient: ApiClient) {}

  getDataVariable(req: IdRequest) {
    return this.apiClient.post(this.servicePath + 'get', req).pipe(take(1));
  }

  getAllDataVariables() {
    return this.apiClient.post(this.servicePath + 'get-all', null).pipe(take(1));
  }

  getDataVariablesForDictionary(req: IdRequest) {
    return this.apiClient.post(this.servicePath + 'get-for-dictionary', req).pipe(take(1));
  }

  createDDVariable(req: DdVariable) {
    return this.apiClient.post(this.servicePath + 'create', req).pipe(take(1));
  }

  updateDDVariable(req: DdVariable) {
    return this.apiClient.post(this.servicePath + 'update', req).pipe(take(1));
  }

  cloneDDVariable(req: DdVariable) {
    return this.apiClient.post(this.servicePath + 'clone', req).pipe(take(1));
  }

  createNewDDVariableVersion(req: DdVariable) {
    return this.apiClient.post(this.servicePath + 'create-new-version', req).pipe(take(1));
  }


}
