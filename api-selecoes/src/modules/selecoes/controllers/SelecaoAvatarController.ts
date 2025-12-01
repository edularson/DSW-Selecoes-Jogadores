import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import UpdateSelecaoAvatarService from '../services/UpdateSelecaoAvatarService';

export default class SelecaoAvatarController {
  public async update(request: Request, response: Response): Promise<void> {
    if (!request.file) {
      throw new AppError('No file uploaded.', 400);
    }

    const updateSelecaoAvatar = new UpdateSelecaoAvatarService();

    const selecao = await updateSelecaoAvatar.execute({
      selecao_id: request.params.id, // Pega o ID da URL
      avatarFilename: request.file.filename,
    });

    response.json(selecao);
  }
}