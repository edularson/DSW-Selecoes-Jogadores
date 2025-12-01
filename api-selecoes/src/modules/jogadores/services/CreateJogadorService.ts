import { getCustomRepository } from 'typeorm';
import Jogador from '../typeorm/entities/Jogador';
import AppError from '@shared/errors/AppError';
import { JogadorRepository } from '../typeorm/repositories/JogadorRepository';
import { SelecaoRepository } from '@modules/selecoes/typeorm/repositories/SelecaoRepository';

interface IRequest {
  nome: string;
  posicao: string; 
  numero: number;
  clube: string; 
  data_nascimento: Date; 
  selecao_id: string;
}

export default class CreateJogadorService {
  public async execute(data: IRequest): Promise<Jogador> {
    const jogadoresRepository = getCustomRepository(JogadorRepository);
    const selecoesRepository = getCustomRepository(SelecaoRepository);

    const selecao = await selecoesRepository.findById(data.selecao_id);
    if (!selecao) {
      throw new AppError('Team not found.');
    }

    const jogador = jogadoresRepository.create(data);
    await jogadoresRepository.save(jogador);
    return jogador;
  }
}