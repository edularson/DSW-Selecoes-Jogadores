import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3333/sessions';

  constructor(private http: HttpClient) { }

  public login(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
  public logout(): void {
    localStorage.removeItem('token');
  }
}