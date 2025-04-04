import { User } from '@app/entities/user/user';
import { UserRepository } from '@app/repository/user/User.repository';

export class UserInMemoryRepository implements UserRepository {
  private users: User[] = [];

  async create(user: User): Promise<void> {
    await this.users.push(user);
  }

  async listAllUsers(): Promise<User[]> {
    return await this.users;
  }

  async delete(id: string): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (!userIndex) throw new Error('Usuário não encontrado');

    this.users.splice(userIndex, 1);
  }

  async findById(id: string): Promise<User | null> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    return userIndex === -1 ? null : this.users[userIndex];
  }

  async findUserbyLogin(login: string): Promise<User | null> {
    const userIndex = this.users.findIndex((user) => user.login === login);

    return userIndex === -1 ? null : this.users[userIndex];
  }
}
