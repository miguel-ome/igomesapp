import { User } from '@app/entities/User/User';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract save(user: User): Promise<void>;
  abstract listAllUsers(): Promise<User[]>;
  abstract findUserbyLogin(login: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
}
