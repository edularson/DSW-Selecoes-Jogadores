import { getCustomRepository } from 'typeorm';
import Jogador from '../typeorm/entities/Jogador';
import AppError from '@shared/errors/AppError';
import { JogadorRepository } from '../typeorm/repositories/JogadorRepository';
import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';

interface IRequest {
  jogador_id: string;
  avatarFilename: string;
}

export default class UpdateJogadorAvatarService {
  public async execute({ jogador_id, avatarFilename }: IRequest): Promise<Jogador> {
    const jogadoresRepository = getCustomRepository(JogadorRepository);

    const jogador = await jogadoresRepository.findOne(jogador_id);
    if (!jogador) {
      throw new AppError('Player not found.', 404);
    }

    if (jogador.avatar) {
      const jogadorAvatarFilePath = path.join(uploadConfig.directory, jogador.avatar);
      try {
        await fs.promises.stat(jogadorAvatarFilePath);
        await fs.promises.unlink(jogadorAvatarFilePath);
      } catch {}
    }

    jogador.avatar = avatarFilename;
    await jogadoresRepository.save(jogador);
    return jogador;
  }
}