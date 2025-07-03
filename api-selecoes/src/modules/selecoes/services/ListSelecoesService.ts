import { getCustomRepository } from 'typeorm';
import Selecao from '../typeorm/entities/Selecao';
import { SelecaoRepository } from '../typeorm/repositories/SelecaoRepository';

export default class ListSelecoesService {
  public async execute(): Promise<Selecao[]> {
    const selecoesRepository = getCustomRepository(SelecaoRepository);
    const selecoes = await selecoesRepository.find();
    return selecoes;
  }
}