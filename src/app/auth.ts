import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private http = inject(HttpClient);

  login(payload: LoginPayload): Observable<AuthResponse> {
    const loginUrl = `${this.apiUrl}/login`;
    return this.http.post<AuthResponse>(loginUrl, payload);
  }

  register(payload: RegisterPayload): Observable<any> {
    const url = `${this.apiUrl}/register`;
    return this.http.post(url, payload);
  }
}
