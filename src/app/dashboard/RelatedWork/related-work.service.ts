import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RelatedWork } from './related-work';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RelatedWorkService {
  constructor(public http: HttpClient) {}
  mainApi = environment.apiUrl;
  private apiUrl = `${this.mainApi}/AdminECommerce/RelatedWork`;

  token = environment.token;

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }

  getAllRelatedWork(index?: number, size?: number): Observable<any> {
    // const url = `${this.mainApi}/${language}/ECommerce/RelatedWork/GetAll?index=${index}&size=${size}`;
    const url = `${this.apiUrl}/GetAll?index=${index}&size=${size}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getAllByProductId(language: string, productID: any): Observable<any> {
    const url = `${this.mainApi}/${language}/ECommerce/RelatedWork/GetAllForProduct/${productID}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getById(id: any) {
    return this.http.get<RelatedWork>(`${this.apiUrl}/get/${id}`);
  }

  deleteById(id: Number) {
    const url = `${this.apiUrl}/delete/${id}`;

    return this.http.delete(url, {
      headers: this.getHeaders(),
    });
  }
  create(data: RelatedWork): Observable<any> {
    const url = `${this.apiUrl}/add`;
    const formData = new FormData();
    if (data.id !== undefined && data.id !== null) {
      formData.append('ID', data.id.toString());
    }
    formData.append('Name', data.name);
    formData.append('ArabicName', data.arabicName);
    formData.append('Describtion', data.describtion);
    formData.append('ArabicDescribtion', data.arabicDescribtion);
    formData.append('ImageOrFile', data.imageOrFile);
    formData.append('ProductId', data.productId.toString());

    return this.http.post(url, formData, { headers: this.getHeaders() });
  }

  updateRelatedWork(id: number, relatedWork: RelatedWork): Observable<any> {
    const url = `${this.apiUrl}/Update/${id}`;
    const formData = new FormData();
    if (relatedWork.id !== undefined && relatedWork.id !== null) {
      formData.append('ID', relatedWork.id);
    }
    formData.append('Name', relatedWork.name);
    formData.append('ArabicName', relatedWork.arabicName);
    formData.append('Describtion', relatedWork.describtion);
    formData.append('ArabicDescribtion', relatedWork.arabicDescribtion);
    formData.append('ImageOrFile', relatedWork.imageOrFile);
    formData.append('ProductId', relatedWork.productId);

    return this.http.put(url, formData, { headers: this.getHeaders() });
  }
}
