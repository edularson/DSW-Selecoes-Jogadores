import { getRepository } from 'typeorm';
import Jogador from '../typeorm/entities/Jogador';

export default class ListJogadoresService {
  public async execute(): Promise<Jogador[]> {
    const jogadoresRepository = getRepository(Jogador);

    // A opção "relations" diz ao TypeORM para fazer um JOIN
    // e trazer os dados da entidade 'selecao' junto.
    const jogadores = await jogadoresRepository.find({
      relations: ['selecao'],
    });

    return jogadores;
  }
}