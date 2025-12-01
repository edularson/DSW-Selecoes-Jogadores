import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body;

    const createSession = new CreateSessionService();

    const { user, token } = await createSession.execute({
      email,
      password,
    });

    response.json({ user, token });
  }
}