import { getRepository } from 'typeorm';
import Selecao from '../typeorm/entities/Selecao';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  pais: string;
  tecnico: string;
  confederacao: string;
  ranking_fifa: number;
  titulos_copa: number;
}

export default class UpdateSelecaoService {
  public async execute({ id, pais, tecnico, confederacao, ranking_fifa, titulos_copa }: IRequest): Promise<Selecao> {
    const selecoesRepository = getRepository(Selecao);
    const selecao = await selecoesRepository.findOne(id);

    if (!selecao) {
      throw new AppError('Team not found.', 404);
    }

    // Verifica se o novo nome de país já não está em uso por outra seleção
    const paisExists = await selecoesRepository.findOne({ where: { pais } });
    if (paisExists && paisExists.id !== id) {
      throw new AppError('There is already a team from this country.');
    }

    selecao.pais = pais;
    selecao.tecnico = tecnico;
    selecao.confederacao = confederacao;
    selecao.ranking_fifa = ranking_fifa;
    selecao.titulos_copa = titulos_copa;

    await selecoesRepository.save(selecao);

    return selecao;
  }
}