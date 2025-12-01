import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sessionsUrl = 'http://localhost:3333/sessions';
  private usersUrl = 'http://localhost:3333/users';

  constructor(private http: HttpClient) { }

  public login(user: User): Observable<any> {
    return this.http.post(this.sessionsUrl, user);
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user);
  }

  public updateAvatar(file: File): Observable<User> {
    const formData = new FormData();
    formData.append('avatar', file, file.name);
    return this.http.patch<User>(`${this.usersUrl}/avatar`, formData);
  }

  public saveSession(token: string, user: User): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  public saveUser(user: User): void {
     localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): User | null {
    const userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString) as User;
    }
    return null;
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}