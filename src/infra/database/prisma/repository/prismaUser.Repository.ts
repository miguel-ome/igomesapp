import { User } from '@app/entities/user/user';
import { UserRepository } from '@app/repository/user/User.repository';
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

  async listAllUsers(): Promise<User[]> {
    const listRowUsers = await this.prisma.user.findMany();

    return listRowUsers.map(PrismaUserMaper.toDomain);
  }
}
