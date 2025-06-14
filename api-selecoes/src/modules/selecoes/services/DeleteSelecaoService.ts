import { getRepository } from 'typeorm';
import Selecao from '../typeorm/entities/Selecao';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

export default class DeleteSelecaoService {
  public async execute({ id }: IRequest): Promise<void> {
    const selecoesRepository = getRepository(Selecao);
    const selecao = await selecoesRepository.findOne(id);

    if (!selecao) {
      throw new AppError('Team not found.', 404);
    }

    await selecoesRepository.remove(selecao);
  }
}