import { User } from '@prisma/client';

export class UserViewModel {
  static toHttp(user: User) {
    return {
      id: user.id,
      login: user.login,
      name: user.name,
    };
  }
}
