import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Selecao } from '../models/selecao';

@Injectable({
  providedIn: 'root'
})
export class SelecaoService {
  private apiUrl = 'http://localhost:3333/selecoes';

  constructor(private http: HttpClient) { }

  public getSelecoes(): Observable<Selecao[]> {
    return this.http.get<Selecao[]>(this.apiUrl);
  }

  public getSelecaoById(id: string): Observable<Selecao> {
    return this.http.get<Selecao>(`${this.apiUrl}/${id}`);
  }

  public createSelecao(selecao: Selecao): Observable<Selecao> {
    return this.http.post<Selecao>(this.apiUrl, selecao);
  }

  public updateSelecao(id: string, selecao: Selecao): Observable<Selecao> {
    return this.http.put<Selecao>(`${this.apiUrl}/${id}`, selecao);
  }

  public deleteSelecao(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  public updateAvatar(id: string, file: File): Observable<Selecao> {
    const formData = new FormData();
    formData.append('avatar', file, file.name);

    return this.http.patch<Selecao>(`${this.apiUrl}/${id}/avatar`, formData);
  }
}