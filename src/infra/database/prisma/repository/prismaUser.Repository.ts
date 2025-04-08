import { User } from '@app/entities/User/User';
import { UserRepository } from '@app/repository/User.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaUserMaper } from '@infra/mapers/PrismaUserMapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const rowUser = PrismaUserMaper.toPrisma(user);

    await this.prisma.user.create({
      data: rowUser,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async save(user: User): Promise<void> {
    const rowUser = PrismaUserMaper.toPrisma(user);
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: rowUser,
    });
  }

  async listAllUsers(): Promise<User[]> {
    const listRowUsers = await this.prisma.user.findMany();

    return listRowUsers.map(PrismaUserMaper.toDomain);
  }

  async findUserbyLogin(login: string): Promise<User | null> {
    const rowUser = await this.prisma.user.findUnique({
      where: {
        login,
      },
    });

    return rowUser ? PrismaUserMaper.toDomain(rowUser) : null;
  }

  async findById(id: string): Promise<User | null> {
    const rowUser = await this.prisma.user.findUnique({
      where: { id },
    });

    return rowUser ? PrismaUserMaper.toDomain(rowUser) : null;
  }
}
