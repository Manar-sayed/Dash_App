import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://companymoasassah.somee.com/ECommerce/Auth/Login';
  private isAuthenticated: boolean = false;
  private user: any;
  private tokenExpiration: Date | null = null;

  constructor(private http: HttpClient) {
    this.loadAuthenticationData();
  }

  private loadAuthenticationData(): void {
    const token = localStorage.getItem('authToken');
    const expiration = localStorage.getItem('tokenExpiration');

    if (token && expiration) {
      this.isAuthenticated = true;
      this.tokenExpiration = new Date(expiration);
    }
  }

  private saveAuthenticationData(token: string, expiration: Date): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('tokenExpiration', expiration.toISOString());
  }

  private clearAuthenticationData(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiration');
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, credentials).pipe(
      tap(
        (response: any) => {
          if (response && response.message && response.isSuccess) {
            this.setAuthentication(true);
            this.setUser(response.user);
            this.setTokenExpiration();
            // this.saveAuthenticationData(response.token, this.tokenExpiration!);
            this.saveAuthenticationData(
              response.message,
              this.tokenExpiration!
            );
          }
        },
        (error) => {
          console.error('Login failed', error);
        }
      )
    );
  }

  logout(): void {
    this.setAuthentication(false);
    this.setUser(null);
    this.clearTokenExpiration();
    this.clearAuthenticationData();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated && this.isTokenValid();
  }

  getUser(): any {
    return this.user;
  }

  private setAuthentication(value: boolean): void {
    this.isAuthenticated = value;
  }

  private setUser(user: any): void {
    this.user = user;
  }

  private setTokenExpiration(): void {
    const now = new Date();
    this.tokenExpiration = new Date(now.getTime() + 3 * 60 * 60 * 1000); // 3 hours
  }

  private clearTokenExpiration(): void {
    this.tokenExpiration = null;
  }

  private isTokenValid(): boolean {
    if (!this.tokenExpiration) {
      return false;
    }

    const now = new Date();
    return now < this.tokenExpiration;
  }
}
