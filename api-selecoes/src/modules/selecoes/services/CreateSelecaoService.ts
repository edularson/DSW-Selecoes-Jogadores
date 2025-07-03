import { getCustomRepository } from 'typeorm';
import Selecao from '../typeorm/entities/Selecao';
import AppError from '@shared/errors/AppError';
import { SelecaoRepository } from '../typeorm/repositories/SelecaoRepository';

interface IRequest {
  pais: string;
  tecnico: string;
  confederacao: string;
  ranking_fifa: number;
  titulos_copa: number;
}

export default class CreateSelecaoService {
  public async execute({ pais, tecnico, confederacao, ranking_fifa, titulos_copa }: IRequest): Promise<Selecao> {
    const selecoesRepository = getCustomRepository(SelecaoRepository);
    const paisExists = await selecoesRepository.findByPais(pais);

    if (paisExists) {
      throw new AppError('There is already a team from this country.');
    }

    const selecao = selecoesRepository.create({
      pais,
      tecnico,
      confederacao,
      ranking_fifa,
      titulos_copa,
    });

    await selecoesRepository.save(selecao);

    return selecao;
  }
}