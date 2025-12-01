import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<void> {
    if (!request.file) {
      throw new AppError('No file uploaded.', 400);
    }

    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    response.json(user);
  }
}