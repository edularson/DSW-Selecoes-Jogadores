import { Selecao } from "./selecao";

export class Jogador {
  id!: string;
  nome!: string;
  posicao!: string;
  numero!: number;
  clube!: string;
  data_nascimento!: Date;
  selecao_id!: string;
  
  avatar?: string; 
  selecao?: Selecao;
  created_at!: Date;
  updated_at!: Date;

  avatarUrl?: string; 
}