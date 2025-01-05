import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly apiUrl: string = 'https://universitysystem-7bcbdef4d122.herokuapp.com/api/v1/auth';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastService: ToastrService
  ) {}

  // Método público: Login
  login(email: string, password: string) {
    return this.httpClient
      .post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          this.storeSession(response);
          this.toastService.success('Login successful!');
          this.router.navigate(['/dashboard']);
        }),
        catchError((error) => {
          this.toastService.error(
            'Login failed! Please check your credentials.'
          );
          console.error('Error during login:', error);
          return throwError(() => error);
        })
      );
  }

  // Método público: Signup
  signup(name: string, email: string, password: string) {
    return this.httpClient
      .post<LoginResponse>(`${this.apiUrl}/register`, { name, email, password })
      .pipe(
        tap((response) => {
          this.storeSession(response);
          this.toastService.success('Registration successful!');
          this.router.navigate(['/dashboard']);
        }),
        catchError((error) => {
          this.toastService.error(
            'Registration failed! Please try again later.'
          );
          console.error('Error during registration:', error);
          return throwError(() => error);
        })
      );
  }

  getAllUsers() {
    return this.httpClient.get<any[]>('https://universitysystem-7bcbdef4d122.herokuapp.com/api/v1/user/find-all-users').pipe(
      tap((users) => console.log('Fetched Users from API:', users)) // Log dos usuários recebidos
    );
  }
  

  // Método público: Busca User ID pelo nome
  getUserIdByName(name: string) {
    return this.httpClient.get<any[]>('https://universitysystem-7bcbdef4d122.herokuapp.com/api/v1/user/find-all-users').pipe(
      map((users) => {
        const user = users.find((u) => u.name === name);
        return user?.id || null; // Retorna somente o ID ou null
      }),
      tap((userId) => {
        console.log('Fetched User ID:', userId);
      })
    );
  }
  
  
  private storeSession(response: LoginResponse): void {
    const userId = response.userId || response.id;
  
    if (!userId) {
      console.warn('User ID not found in the response. Fetching from the user list...');
      this.getUserIdByName(response.name).subscribe({
        next: (fetchedUserId: string) => {
          if (fetchedUserId) {
            sessionStorage.setItem('userId', fetchedUserId);
            sessionStorage.setItem('auth-token', response.token);
            sessionStorage.setItem('dashboardname', response.name);
            console.log('User ID fetched and saved:', fetchedUserId);
  
            // Redireciona somente após salvar o ID
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
      // Se o ID já existir, salva diretamente e redireciona
      sessionStorage.setItem('userId', userId);
      sessionStorage.setItem('auth-token', response.token);
      sessionStorage.setItem('dashboardname', response.name);
      console.log('User ID saved:', userId);
      this.router.navigate(['/dashboard']);
    }
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