import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IClient } from '../interfaces/client';

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

  registerClient(client: IClient) {
    return this.http.post(`${this.api}/${this.getClientsAll}`, client);
  }

  editClient(cpf: number, client: IClient) {
    return this.http.put(`${this.api}/${this.getClientsAll}/${cpf}`, client);
  }

  deleteClient(cpf: number) {
    return this.http.delete(`${this.api}/${this.getClientsAll}/${cpf}`);
  }
}
