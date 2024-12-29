import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly apiUrl: string = "http://localhost:8080/api/v1/auth";

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((value) => {
        this.storeSession(value);
        this.router.navigate(['/dashboard']);
      })
    );
  }

  signup(name: string, email: string, password: string) {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/register`, { name, email, password }).pipe(
      tap((value) => {
        this.storeSession(value);
        this.router.navigate(['/dashboard']);
      })
    );
  }

  private storeSession(response: LoginResponse) {
    sessionStorage.setItem("auth-token", response.token);
    sessionStorage.setItem("dashboardname", response.name);
  }
}
