import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contactmessage } from './contactmessage';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactmessageService {
  mainApi = environment.apiUrl;
  private apiUrl = `${this.mainApi}/ECommerce/Messages`;

  token = environment.token;

  constructor(public http: HttpClient) {}
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }

  // get All
  getAllMessage(index?: number, size?: number): Observable<any> {
    const url = `${this.apiUrl}/GetAll?index=${index}&size=${size}&message=${this.token}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  // get by [id]
  getById(id: any) {
    const url = `${this.apiUrl}/Get?id=${id}`;
    return this.http.get<Contactmessage>(url, { headers: this.getHeaders() });
  }
  // create
  create(data: any): Observable<any> {
    const url = `${this.apiUrl}/Add`;
    return this.http.post(url, data, { headers: this.getHeaders() });
  }
}
