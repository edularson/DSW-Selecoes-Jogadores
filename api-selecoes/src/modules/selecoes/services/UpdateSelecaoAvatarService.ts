import { getCustomRepository } from 'typeorm';
import Selecao from '../typeorm/entities/Selecao';
import AppError from '@shared/errors/AppError';
import { SelecaoRepository } from '../typeorm/repositories/SelecaoRepository';
import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';

interface IRequest {
  selecao_id: string;
  avatarFilename: string;
}

export default class UpdateSelecaoAvatarService {
  public async execute({ selecao_id, avatarFilename }: IRequest): Promise<Selecao> {
    const selecoesRepository = getCustomRepository(SelecaoRepository);

    const selecao = await selecoesRepository.findById(selecao_id);
    if (!selecao) {
      throw new AppError('Team not found.', 404);
    }

    if (selecao.avatar) {
      const selecaoAvatarFilePath = path.join(uploadConfig.directory, selecao.avatar);
      try {
        await fs.promises.stat(selecaoAvatarFilePath);
        await fs.promises.unlink(selecaoAvatarFilePath);
      } catch {}
    }

    selecao.avatar = avatarFilename;
    await selecoesRepository.save(selecao);
    return selecao;
  }
}