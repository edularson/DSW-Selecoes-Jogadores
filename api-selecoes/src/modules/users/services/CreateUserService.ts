import { getRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { hash } from 'bcryptjs';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
    name: string;
    email: string;
    password?: string;
}

export default class CreateUserService {
    public async execute({ name, email, password }: IRequest): Promise<User> {
        const usersRepository = getRepository(User);

        const emailExists = await usersRepository.findOne({
            where: { email },
        });

        if (emailExists) {
            throw new AppError('This email address is already in use.');
        }

        if (!password) {
            throw new AppError('Password is required.');
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await usersRepository.save(user);

        delete user.password;
        return user;
    }
}