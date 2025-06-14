import { getRepository } from 'typeorm';
import Selecao from '../typeorm/entities/Selecao';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

export default class ShowSelecaoService {
  public async execute({ id }: IRequest): Promise<Selecao> {
    const selecoesRepository = getRepository(Selecao);
    const selecao = await selecoesRepository.findOne(id);

    if (!selecao) {
      throw new AppError('Team not found.', 404);
    }

    return selecao;
  }
}