import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly apiUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  // Método para buscar todos os usuários
  getAllUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/users`);
  }
}
