import { EntityRepository, Repository } from 'typeorm';
import Selecao from '../entities/Selecao';

@EntityRepository(Selecao)
export class SelecaoRepository extends Repository<Selecao> {

  public async findByPais(pais: string): Promise<Selecao | undefined> {
    const selecao = await this.findOne({
      where: {
        pais,
      },
    });
    return selecao;
  }

  public async findById(id: string): Promise<Selecao | undefined> {
    const selecao = await this.findOne({
      where: {
        id,
      },
    });
    return selecao;
  }
}