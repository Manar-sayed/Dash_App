import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Setting } from './setting';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  mainApi = environment.apiUrl;
  private apiUrl = `${this.mainApi}/ECommerce/Setting`;
  token = localStorage.getItem('authToken');
  constructor(public http: HttpClient) {}
  // token
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }

  // get all
  getAllSetting(): Observable<any> {
    const url = `${this.apiUrl}/get`;

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );

    return this.http.get(url, { headers: this.getHeaders() });
  }

  // update
  updateSetting(setting: Setting): Observable<any> {
    const url = `${this.apiUrl}/update/1`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );

    return this.http.put(url, setting, { headers: this.getHeaders() });
  }
}
