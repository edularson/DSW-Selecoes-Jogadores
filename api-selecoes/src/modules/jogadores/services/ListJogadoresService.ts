import { getCustomRepository } from 'typeorm';
import Jogador from '../typeorm/entities/Jogador';
import { JogadorRepository } from '../typeorm/repositories/JogadorRepository';

export default class ListJogadoresService {
  public async execute(): Promise<Jogador[]> {
    const jogadoresRepository = getCustomRepository(JogadorRepository);
    const jogadores = await jogadoresRepository.findAllWithSelecao(); // Usando nosso novo método
    return jogadores;
  }
}