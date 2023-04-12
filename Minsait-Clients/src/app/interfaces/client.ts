import { IAddress } from './address';

export interface IClientForm {
  nome: string;
  cpf: number;
  telefone: number;
  rendimentoMensal: number;
}

export interface IClientAddress extends IClientForm, IAddress {}

export interface IClient extends IClientForm {
  endereco: IAddress;
}
