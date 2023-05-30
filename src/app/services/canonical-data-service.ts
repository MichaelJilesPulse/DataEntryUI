import {Injectable} from '@angular/core';
import {ApiClient} from './api-client';

@Injectable({
  providedIn: 'root'
})
export class CanonicalDataService {

  private readonly servicePath = 'canonical/';

  constructor(private apiClient: ApiClient) {}

  getStorageLocations() {
    return this.apiClient.post(this.servicePath + 'get-storage-locations', null);
  }

  getFormControlTypes() {
    return this.apiClient.post(this.servicePath + 'get-form-control-types', null);
  }
}
