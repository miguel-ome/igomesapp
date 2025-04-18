import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from '@app/repository/User.repository';
import { PrismaUserRepository } from './prisma/repository/prismaUser.repository';
import { NfeRepository } from '@app/repository/NfeRepository';
import { PrismaNfeRepository } from './prisma/repository/prismaNfe.Repository';
import { PrismaPaymentMethodRepository } from './prisma/repository/prismaPaymentMethod.Repository';
import { PaymentMethodRepository } from '@app/repository/PaymentMethodRepository';
import { PaymentRepository } from '@app/repository/PaymentRepository';
import { PrismaPaymentRepository } from './prisma/repository/prismaPayment.Repository';

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
    {
      provide: PaymentMethodRepository,
      useClass: PrismaPaymentMethodRepository,
    },
    {
      provide: PaymentRepository,
      useClass: PrismaPaymentRepository,
    },
  ],
  exports: [
    UserRepository,
    NfeRepository,
    PaymentMethodRepository,
    PaymentRepository,
  ],
})
export class DatabaseModule {}
