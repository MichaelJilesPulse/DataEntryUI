import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConstants} from '../models/constants/app-constants';

@Injectable({
  providedIn: 'root'
}) export class ApiClient {
  constructor(private httpClient: HttpClient) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS, POST',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  });

  post(path: string, request: any) {
    return this.httpClient.post<typeof request>(AppConstants.BASE_URL + path, request, {headers: this.headers});
  }
}
