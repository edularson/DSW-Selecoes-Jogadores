import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { UserRepository } from '../typeorm/repositories/UserRepository';

interface IRequest {
  email: string;
  password?: string;
}

interface IResponse {
  user: User;
  token: string;
}

export default class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UserRepository);

    // Usando nosso método customizado
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    if (!password) {
      throw new AppError('Password is required.');
    }

    const userWithPassword = await usersRepository.findOne({
        where: { email },
        select: ['id', 'name', 'email', 'password', 'avatar', 'created_at', 'updated_at']
    });

    if (!userWithPassword || !userWithPassword.password) {
        throw new AppError('Something went wrong.', 500);
    }

    const passwordConfirmed = await compare(password, userWithPassword.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
    });

    delete user.password;

    return {
      user,
      token,
    };
  }
}