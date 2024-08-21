import { User } from '@app/entities/user/user';
import { UserRepository } from '@app/repository/user/User.repository';

export class UserInMemoryRepository implements UserRepository {
  users: User[] = [];

  async create(user: User): Promise<void> {
    await this.users.push(user);
  }

  async findUserById(idUser: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === idUser);

    if (!user) return null;

    return user;
  }
}
