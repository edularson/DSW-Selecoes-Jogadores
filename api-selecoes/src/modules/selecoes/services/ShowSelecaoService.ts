import { getCustomRepository } from 'typeorm';
import Selecao from '../typeorm/entities/Selecao';
import AppError from '@shared/errors/AppError';
import { SelecaoRepository } from '../typeorm/repositories/SelecaoRepository';

interface IRequest {
  id: string;
}

export default class ShowSelecaoService {
  public async execute({ id }: IRequest): Promise<Selecao> {
    const selecoesRepository = getCustomRepository(SelecaoRepository);
    const selecao = await selecoesRepository.findById(id);

    if (!selecao) {
      throw new AppError('Team not found.', 404);
    }

    return selecao;
  }
}