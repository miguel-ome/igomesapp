import { User } from '@app/entities/User/User';
import { User as RowUser } from '@prisma/client';

export class PrismaUserMaper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      login: user.login,
      name: user.name,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toDomain(rowUser: RowUser) {
    return new User(
      {
        login: rowUser.login,
        name: rowUser.name,
        password: rowUser.password,
        createdAt: rowUser.createdAt,
        updatedAt: rowUser.updatedAt,
      },
      rowUser.id,
    );
  }
}
