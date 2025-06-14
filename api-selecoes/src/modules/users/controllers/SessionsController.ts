import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<void> {
    // 1. Pega os dados do corpo da requisição
    const { email, password } = request.body;

    // 2. Instancia o nosso serviço de sessão
    const createSession = new CreateSessionService();

    // 3. Executa o serviço, que vai retornar o usuário e o token
    const { user, token } = await createSession.execute({
      email,
      password,
    });

    // 4. Retorna uma resposta com os dados do usuário e o token
    response.json({ user, token });
  }
}