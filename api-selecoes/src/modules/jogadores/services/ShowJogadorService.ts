import { getRepository } from 'typeorm';
import Jogador from '../typeorm/entities/Jogador';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

export default class ShowJogadorService {
  public async execute({ id }: IRequest): Promise<Jogador> {
    const jogadoresRepository = getRepository(Jogador);
    const jogador = await jogadoresRepository.findOne(id, {
      relations: ['selecao'], // Também traz os dados da seleção junto
    });

    if (!jogador) {
      throw new AppError('Player not found.', 404);
    }

    return jogador;
  }
}