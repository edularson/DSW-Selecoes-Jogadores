import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jogador } from '../models/jogador';

@Injectable({
  providedIn: 'root'
})
export class JogadorService {
  private apiUrl = 'http://localhost:3333/jogadores';

  constructor(private http: HttpClient) { }

  public getJogadores(): Observable<Jogador[]> {
    return this.http.get<Jogador[]>(this.apiUrl);
  }

  public getJogadorById(id: string): Observable<Jogador> {
    return this.http.get<Jogador>(`${this.apiUrl}/${id}`);
  }

  public createJogador(jogador: Jogador): Observable<Jogador> {
    return this.http.post<Jogador>(this.apiUrl, jogador);
  }

  public updateJogador(id: string, jogador: Jogador): Observable<Jogador> {
    return this.http.put<Jogador>(`${this.apiUrl}/${id}`, jogador);
  }

  public deleteJogador(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  public updateAvatar(id: string, file: File): Observable<Jogador> {
    const formData = new FormData();
    formData.append('avatar', file, file.name);

    return this.http.patch<Jogador>(`${this.apiUrl}/${id}/avatar`, formData);
  }
}