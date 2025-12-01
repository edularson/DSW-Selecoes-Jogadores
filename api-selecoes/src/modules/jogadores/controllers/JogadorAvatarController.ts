import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import UpdateJogadorAvatarService from '../services/UpdateJogadorAvatarService';

export default class JogadorAvatarController {
  public async update(request: Request, response: Response): Promise<void> {
    if (!request.file) {
      throw new AppError('No file uploaded.', 400);
    }

    const updateJogadorAvatar = new UpdateJogadorAvatarService();

    const jogador = await updateJogadorAvatar.execute({
      jogador_id: request.params.id, // Pega o ID da URL
      avatarFilename: request.file.filename,
    });

    response.json(jogador);
  }
}