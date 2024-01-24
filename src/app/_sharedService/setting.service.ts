import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Setting } from './setting';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  // baseUrl = environment.apiUrl;
  mainApi = environment.apiUrl;
  private apiUrl = `${this.mainApi}/ECommerce/Setting`;

  token = environment.token;

  // private apiUrl = 'http://companymoasassah.somee.com/ECommerce/Setting';
  constructor(public http: HttpClient) {}
  // token
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }

  // get all product
  getAllSetting(): Observable<any> {
    const url = `${this.apiUrl}/get`;

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );

    return this.http.get(url);
  }

  // update
  // http://companymoasassah.somee.com/ECommerce/Setting/update/1
  updateSetting(setting: Setting): Observable<any> {
    const url = `${this.apiUrl}/update/1`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );

    return this.http.put(url, setting);
  }
}
