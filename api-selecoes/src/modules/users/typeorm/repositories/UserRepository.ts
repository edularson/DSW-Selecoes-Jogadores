import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  // Método para buscar um usuário pelo nome
  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        name,
      },
    });
    return user;
  }

  // Método para buscar um usuário pelo ID
  public async findById(id: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        id,
      },
    });
    return user;
  }

  // Método para buscar um usuário pelo e-mail
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        email,
      },
    });
    return user;
  }
}