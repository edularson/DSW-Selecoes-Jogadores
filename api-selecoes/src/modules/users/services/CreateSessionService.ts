import { getRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

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
        const usersRepository = getRepository(User);

        // 1. Verifica se o usuário existe
        const user = await usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        // 2. Garante que a senha foi fornecida
        if (!password) {
            throw new AppError('Password is required.');
        }

        // 3. Compara a senha enviada com a senha criptografada no banco
        const passwordConfirmed = await compare(password, user.password!);

        if (!passwordConfirmed) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        // 4. Gera o Token JWT
        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id, // O "dono" do token
        });

        // 5. Retorna o usuário (sem a senha) e o token
        delete user.password;

        return {
            user,
            token,
        };
    }
}