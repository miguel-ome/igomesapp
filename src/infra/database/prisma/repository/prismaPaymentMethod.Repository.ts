import { PaymentMethod } from '@app/entities/Payment/Payment';
import { PaymentMethodRepository } from '@app/repository/PaymentMethodRepository';
import { PrismaPaymentMethodMapper } from '@infra/mapers/PrismaPaymentMethod';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaPaymentMethodRepository implements PaymentMethodRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(paymentMethod: PaymentMethod): Promise<void> {
    const rowPaymentMethod = PrismaPaymentMethodMapper.toPrisma(paymentMethod);
    await this.prisma.paymentMethod.create({ data: rowPaymentMethod });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.paymentMethod.delete({ where: { id } });
  }

  async findById(id: string): Promise<PaymentMethod | null> {
    const paymentMethod = await this.prisma.paymentMethod.findUnique({
      where: { id },
    });

    return paymentMethod
      ? PrismaPaymentMethodMapper.toDomain(paymentMethod)
      : null;
  }

  async listAllPaymentMethods(): Promise<PaymentMethod[]> {
    const paymentMethods = await this.prisma.paymentMethod.findMany();
    return paymentMethods.map(PrismaPaymentMethodMapper.toDomain);
  }

  async save(paymentMethod: PaymentMethod): Promise<void> {
    const rowPaymentMethod = PrismaPaymentMethodMapper.toPrisma(paymentMethod);
    await this.prisma.paymentMethod.update({
      where: { id: paymentMethod.id },
      data: rowPaymentMethod,
    });
  }
}
