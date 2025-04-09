import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from '@app/repository/User.repository';
import { PrismaUserRepository } from './prisma/repository/prismaUser.repository';
import { NfeRepository } from '@app/repository/NfeRepository';
import { PrismaNfeRepository } from './prisma/repository/prismaNfe.Repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: NfeRepository,
      useClass: PrismaNfeRepository,
    },
  ],
  exports: [UserRepository, NfeRepository],
})
export class DatabaseModule {}
