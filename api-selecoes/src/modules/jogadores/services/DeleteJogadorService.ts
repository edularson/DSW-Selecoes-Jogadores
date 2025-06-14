import { getRepository } from 'typeorm';
import Jogador from '../typeorm/entities/Jogador';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

export default class DeleteJogadorService {
  public async execute({ id }: IRequest): Promise<void> {
    const jogadoresRepository = getRepository(Jogador);
    const jogador = await jogadoresRepository.findOne(id);

    if (!jogador) {
      throw new AppError('Player not found.', 404);
    }

    await jogadoresRepository.remove(jogador);
  }
}