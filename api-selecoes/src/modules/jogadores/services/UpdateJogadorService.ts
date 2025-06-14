import { getRepository } from 'typeorm';
import Jogador from '../typeorm/entities/Jogador';
import AppError from '@shared/errors/AppError';
import Selecao from '@modules/selecoes/typeorm/entities/Selecao';

interface IRequest {
  id: string;
  nome: string;
  posicao: string;
  numero: number;
  clube: string;
  data_nascimento: Date;
  selecao_id: string;
}

export default class UpdateJogadorService {
  public async execute(data: IRequest): Promise<Jogador> {
    const jogadoresRepository = getRepository(Jogador);
    const selecoesRepository = getRepository(Selecao);

    const jogador = await jogadoresRepository.findOne(data.id);
    if (!jogador) {
      throw new AppError('Player not found.', 404);
    }

    const selecao = await selecoesRepository.findOne(data.selecao_id);
    if (!selecao) {
      throw new AppError('Team not found.');
    }

    // Atualiza os dados
    jogador.nome = data.nome;
    jogador.posicao = data.posicao;
    jogador.numero = data.numero;
    jogador.clube = data.clube;
    jogador.data_nascimento = data.data_nascimento;
    jogador.selecao_id = data.selecao_id;

    await jogadoresRepository.save(jogador);

    return jogador;
  }
}