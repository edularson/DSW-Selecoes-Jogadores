import { EntityRepository, Repository } from 'typeorm';
import Jogador from '../entities/Jogador';

@EntityRepository(Jogador)
export class JogadorRepository extends Repository<Jogador> {

  // Método customizado para buscar um jogador pelo ID, já incluindo os dados da seleção
  public async findById(id: string): Promise<Jogador | undefined> {
    const jogador = await this.findOne(id, {
      relations: ['selecao'],
    });
    return jogador;
  }

  // Método para buscar todos os jogadores, já incluindo os dados da seleção
  public async findAllWithSelecao(): Promise<Jogador[]> {
    const jogadores = await this.find({
      relations: ['selecao'],
    });
    return jogadores;
  }
}