import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError, Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly apiUrl: string = environment.apiBaseUrl;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastService: ToastrService
  ) {}

  // Método público: Signup
  signup(name: string, email: string, password: string): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(`${this.apiUrl}/register`, { name, email, password })
      .pipe(
        tap((response) => {
          this.storeSession(response);
          this.toastService.success('Registration successful!');
          this.router.navigate(['/dashboard']);
        }),
        catchError((error) => {
          this.toastService.error('Registration failed! Please try again later.');
          console.error('Error during registration:', error);
          return throwError(() => error);
        })
      );
  }

  // Método público: Busca User ID pelo nome
  getUserIdByName(name: string): Observable<string | null> {
    return this.httpClient
      .get<any[]>(`${this.apiUrl}/user/find-all-users`)
      .pipe(
        map((users) => {
          const user = users.find((u) => u.name === name);
          return user?.id || null;
        }),
        tap((userId) => console.log('Fetched User ID:', userId)),
        catchError((error) => {
          console.error('Error fetching user ID by name:', error);
          return throwError(() => error);
        })
      );
  }

  private storeSession(response: LoginResponse): void {
    const userId = response.userId || response.id;

    if (!userId) {
      console.warn('User ID not found in the response. Fetching from the user list...');
      this.getUserIdByName(response.name).subscribe({
        next: (fetchedUserId) => {
          if (fetchedUserId) {
            this.saveSessionData(fetchedUserId, response);
            console.log('User ID fetched and saved:', fetchedUserId);
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Failed to fetch user ID.');
            this.toastService.error('Failed to fetch user information. Please try again.');
          }
        },
        error: (err) => {
          console.error('Error fetching user ID:', err);
          this.toastService.error('Failed to fetch user information. Please try again.');
        },
      });
    } else {
      this.saveSessionData(userId, response);
      console.log('User ID saved:', userId);
      this.router.navigate(['/dashboard']);
    }
  }

  private saveSessionData(userId: string, response: LoginResponse): void {
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('auth-token', response.token);
    sessionStorage.setItem('dashboardname', response.name);
  }
}

/*

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly apiUrl: string = 'http://localhost:8080/api/v1/auth';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastService: ToastrService // Para feedback do usuário
  ) {}

  login(email: string, password: string) {
    return this.httpClient
      .post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          this.storeSession(response);
          this.toastService.success('Login successful!'); // Feedback para o usuário
          this.router.navigate(['/dashboard']);
        }),
        catchError((error) => {
          this.toastService.error('Login failed! Please check your credentials.');
          console.error('Error during login:', error);
          return throwError(() => error); // Propaga o erro
        })
      );
  }

  signup(name: string, email: string, password: string) {
    return this.httpClient
      .post<LoginResponse>(`${this.apiUrl}/register`, { name, email, password })
      .pipe(
        tap((response) => {
          this.storeSession(response);
          this.toastService.success('Registration successful!'); // Feedback para o usuário
          this.router.navigate(['/dashboard']);
        }),
        catchError((error) => {
          this.toastService.error('Registration failed! Please try again later.');
          console.error('Error during registration:', error);
          return throwError(() => error); // Propaga o erro
        })
      );
  }

  private storeSession(response: LoginResponse) {
    if (!response.userId) {
      this.toastService.error('User ID is missing in the response!');
      console.error('User ID is missing in the response!');
      return;
    }
    sessionStorage.setItem('auth-token', response.token);
    sessionStorage.setItem('userId', response.userId); // Salva o userId corretamente
    sessionStorage.setItem('dashboardname', response.name);
  }
}


/*

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
    if (!response.userId) {
      console.error('User ID is missing in the response!');
      return;
    }
    sessionStorage.setItem('auth-token', response.token);
    sessionStorage.setItem('userId', response.userId); // Salva o userId corretamente
    sessionStorage.setItem('dashboardname', response.name);
  }
}

*/
