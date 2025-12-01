import { Jogador } from "./jogador"; // Assumindo que você possa querer a lista de jogadores no futuro

export class Selecao {
  id!: string;
  pais!: string;
  tecnico!: string;
  confederacao!: string;
  ranking_fifa!: number;
  titulos_copa!: number;
  avatar?: string;
  jogadores?: Jogador[];
  created_at!: Date;
  updated_at!: Date;
  avatarUrl?: string; 
}