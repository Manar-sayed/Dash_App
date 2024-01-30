import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Photo, Product } from './product';
import { Observable, last } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  mainApi = environment.apiUrl;
  private apiUrl = `${this.mainApi}/Admin/ECommerce/Product`;

  private apiUrlImage = `${this.mainApi}/ECommerce/Photos`;
  private categoryApi = `${this.mainApi}/Admin/ECommerce/Category`;
  // token = environment.token;
  token = localStorage.getItem('authToken');

  constructor(public http: HttpClient) {}
  // token
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }

  // get all product
  // getAllProducts(index?: number, size?: number): Observable<any> {
  //   const url = `${this.apiUrl}/GetAll?index=${index}&size=${size}&message=${this.token}`;
  //   return this.http.get(url, { headers: this.getHeaders() });
  // }

  //get all by translation
  getAllProducts(
    language: string,
    index?: number,
    size?: number
  ): Observable<any> {
    const url = `${this.apiUrl}/GetAll?index=${index}&size=${size}&message=${this.token}`;
    // const url = `${this.mainApi}/${language}/ECommerce/Product/GetAll?index=${index}&size=${size}&message=${this.token}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getAllCategory(index?: number, size?: number): Observable<any> {
    // const url = `${this.mainApi}/${language}/ECommerce/Category/GetAll?index=${index}&size=${size}&message=${this.token}`;
    const url = `${this.categoryApi}/GetAll?index=${index}&size=${size}&message=${this.token}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  // get by [id]
  getById(id: any, language: string) {
    return this.http.get<Product>(
      // `${this.mainApi}/${language}/ECommerce/Product/Get?ProductID=${id}`
      `${this.apiUrl}/Get?ProductID=${id}`,
      { headers: this.getHeaders() }
    );
  }
  getByCategoryId(categoryId: any, language: string) {
    return this.http.get<Product>(
      // `${this.mainApi}/${language}/ECommerce/Product/${categoryId}`
      `${this.apiUrl}/${categoryId}`,
      { headers: this.getHeaders() }
    );
  }

  // delete
  deleteById(id: Number) {
    return this.http.delete(`${this.apiUrl}/delete?productID=${id}`, {
      headers: this.getHeaders(),
    });
  }

  // create
  create(data: any): Observable<any> {
    const url = `${this.apiUrl}/Add`;
    return this.http.post(url, data, { headers: this.getHeaders() });
  }
  // update
  updateProduct(id: number, product: Product): Observable<any> {
    const url = `${this.apiUrl}/Update?productID=${id}`;
    return this.http.put(url, product, { headers: this.getHeaders() });
  }

  uploadImages(product: Photo): Observable<any> {
    const url = `${this.apiUrlImage}/add`;
    const formData = new FormData();
    // Ensure 'product' and 'product.ProductID' are defined before accessing properties
    if (
      product &&
      product.ProductID !== undefined &&
      product.ProductID !== null
    ) {
      formData.append('ProductID', product.ProductID.toString());
    }

    // Ensure 'product.ID' is defined before accessing it
    if (product && product.ID !== undefined && product.ID !== null) {
      formData.append('ID', product.ID.toString());
    }

    // Ensure 'product.ImageOrFile' is defined before appending it to formData
    if (product && product.ImageOrFile) {
      formData.append('ImageOrFile', product.ImageOrFile);
    }
    return this.http.post(url, formData, { headers: this.getHeaders() });
  }
}
