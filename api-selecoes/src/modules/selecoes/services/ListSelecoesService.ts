import { getRepository } from 'typeorm';
import Selecao from '../typeorm/entities/Selecao';

// Usando a sintaxe de exportação que você pediu
export default class ListSelecoesService {
  public async execute(): Promise<Selecao[]> {
    const selecoesRepository = getRepository(Selecao);

    const selecoes = await selecoesRepository.find();

    return selecoes;
  }
}