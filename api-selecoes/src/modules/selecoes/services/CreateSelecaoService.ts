import { getRepository } from 'typeorm';
import Selecao from '../typeorm/entities/Selecao';
import AppError from '@shared/errors/AppError';

interface IRequest {
  pais: string;
  tecnico: string;
  confederacao: string;
  ranking_fifa: number;
  titulos_copa: number;
}

class CreateSelecaoService {
  public async execute({ pais, tecnico, confederacao, ranking_fifa, titulos_copa }: IRequest): Promise<Selecao> {
    const selecoesRepository = getRepository(Selecao);

    // Verifica se já existe uma seleção com o mesmo país
    const paisExists = await selecoesRepository.findOne({
      where: { pais },
    });

    if (paisExists) {
      throw new AppError('There is already a team from this country.');
    }

    const selecao = selecoesRepository.create({
      pais,
      tecnico,
      confederacao,
      ranking_fifa,
      titulos_copa,
    });

    await selecoesRepository.save(selecao);

    return selecao;
  }
}

export default CreateSelecaoService;