
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL='https://findart-ml-backend.herokuapp.com';

  constructor(private http: HttpClient) { }

  decisionTree(formData: any): Observable<any> {
    return this.http.post(`${this.apiURL}/decisiontree`, formData);
  }
}
