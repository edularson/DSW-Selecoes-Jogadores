import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { JogadorRepository } from '../typeorm/repositories/JogadorRepository';

interface IRequest {
  id: string;
}

export default class DeleteJogadorService {
  public async execute({ id }: IRequest): Promise<void> {
    const jogadoresRepository = getCustomRepository(JogadorRepository);
    const jogador = await jogadoresRepository.findOne(id);

    if (!jogador) {
      throw new AppError('Player not found.', 404);
    }

    await jogadoresRepository.remove(jogador);
  }
}