import { EntityRepository, Repository } from 'typeorm';
import Jogador from '../entities/Jogador';

@EntityRepository(Jogador)
export class JogadorRepository extends Repository<Jogador> {

  public async findById(id: string): Promise<Jogador | undefined> {
    const jogador = await this.findOne(id, {
      relations: ['selecao'],
    });
    return jogador;
  }

  public async findAllWithSelecao(): Promise<Jogador[]> {
    const jogadores = await this.find({
      relations: ['selecao'],
    });
    return jogadores;
  }
}