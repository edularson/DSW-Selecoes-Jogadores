import { getCustomRepository } from 'typeorm';
import Jogador from '../typeorm/entities/Jogador';
import AppError from '@shared/errors/AppError';
import { JogadorRepository } from '../typeorm/repositories/JogadorRepository';

interface IRequest {
  id: string;
}

export default class ShowJogadorService {
  public async execute({ id }: IRequest): Promise<Jogador> {
    const jogadoresRepository = getCustomRepository(JogadorRepository);
    const jogador = await jogadoresRepository.findById(id); // Usando nosso novo método

    if (!jogador) {
      throw new AppError('Player not found.', 404);
    }

    return jogador;
  }
}