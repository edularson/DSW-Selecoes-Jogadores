import { getCustomRepository } from 'typeorm';
import Jogador from '../typeorm/entities/Jogador';
import AppError from '@shared/errors/AppError';
import { JogadorRepository } from '../typeorm/repositories/JogadorRepository';
import { SelecaoRepository } from '@modules/selecoes/typeorm/repositories/SelecaoRepository';

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
    const jogadoresRepository = getCustomRepository(JogadorRepository);
    const selecoesRepository = getCustomRepository(SelecaoRepository);

    const jogador = await jogadoresRepository.findOne(data.id);
    if (!jogador) {
      throw new AppError('Player not found.', 404);
    }

    const selecao = await selecoesRepository.findById(data.selecao_id);
    if (!selecao) {
      throw new AppError('Team not found.');
    }

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