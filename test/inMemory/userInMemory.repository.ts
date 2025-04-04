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
}
