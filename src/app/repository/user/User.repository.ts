import { User } from '@app/entities/user/user';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract listAllUsers(): Promise<User[]>;
  abstract delete(id: string): Promise<void>;
  abstract findUserbyLogin(login: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
}
