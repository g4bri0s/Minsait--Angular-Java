export interface IClient {
  nome: string;
  cpf: number;
  endereco: {
    rua: string;
    numero: number;
    cep: number;
  };
  telefone: number;
  rendimentoMensal: number;
}
