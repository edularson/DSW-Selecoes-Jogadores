import { getRepository } from 'typeorm';
import Jogador from '../typeorm/entities/Jogador';
import Selecao from '@modules/selecoes/typeorm/entities/Selecao';
import AppError from '@shared/errors/AppError';

interface IRequest {
  nome: string;
  posicao: string;
  numero: number;
  clube: string;
  data_nascimento: Date;
  selecao_id: string; // ID da seleção a que ele pertence
}

export default class CreateJogadorService {
  public async execute(data: IRequest): Promise<Jogador> {
    const jogadoresRepository = getRepository(Jogador);
    const selecoesRepository = getRepository(Selecao);

    // Verifica se a seleção informada existe
    const selecao = await selecoesRepository.findOne(data.selecao_id);
    if (!selecao) {
      throw new AppError('Team not found.');
    }

    const jogador = jogadoresRepository.create(data);

    await jogadoresRepository.save(jogador);

    return jogador;
  }
}