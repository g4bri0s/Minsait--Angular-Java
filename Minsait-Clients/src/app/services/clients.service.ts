import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IClient } from '../interfaces/client';
import { EMPTY, Observable, map, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  getClientsAll = 'clientes';
  api = environment.api;

  constructor(private http: HttpClient) {}

  getClients() {
    return this.http.get<IClient[]>(`${this.api}/${this.getClientsAll}`);
  }

  getClintByCpf(cpf: number) {
    return this.http.get<IClient>(`${this.api}/${this.getClientsAll}/${cpf}`);
  }

  existClintByCpf(cpf: number): Observable<boolean> {
    return this.http
      .get<IClient>(`${this.api}/${this.getClientsAll}/${cpf}`)
      .pipe(
        map((response) => {
          return response !== null;
        }),
        catchError((error) => {
          if (error.status === 404) {
            return of(false);
          } else {
            throw error;
          }
        }),
        map((exists) => {
          return exists as boolean;
        })
      );
  }

  registerClient(client: IClient): Observable<any> {
    return this.http.post(`${this.api}/${this.getClientsAll}`, client).pipe(
      tap(() => {
        return of(null);
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  editClient(cpf: number, client: IClient) {
    return this.http.put(`${this.api}/${this.getClientsAll}/${cpf}`, client);
  }

  deleteClient(cpf: number) {
    return this.http.delete(`${this.api}/${this.getClientsAll}/${cpf}`);
  }
}
