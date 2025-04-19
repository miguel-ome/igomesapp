import { Payment } from '@app/entities/Payment/Payment';
import { PaymentRepository } from '@app/repository/PaymentRepository';
import { PrismaService } from '../prisma.service';
import { PrismaPaymentMapper } from '@infra/mapers/PrismaPaymentMapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaPaymentRepository implements PaymentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(payment: Payment): Promise<void> {
    const rowPayment = PrismaPaymentMapper.toPrisma(payment);
    await this.prisma.payment.create({ data: rowPayment });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.payment.delete({ where: { id } });
  }

  async findById(id: string): Promise<Payment | null> {
    const rowPayment = await this.prisma.payment.findUnique({
      where: { id },
      include: {
        PaymentMethod: {
          select: {
            id: true,
            name: true,
          },
        },
        Nfe: {
          select: {
            id: true,
            numberNf: true,
          },
        },
      },
    });
    return rowPayment ? PrismaPaymentMapper.toDomain(rowPayment) : null;
  }

  async listAllPayments(): Promise<Payment[]> {
    const rowPayments = await this.prisma.payment.findMany({
      include: {
        PaymentMethod: {
          select: {
            id: true,
            name: true,
          },
        },
        Nfe: {
          select: {
            id: true,
            numberNf: true,
          },
        },
      },
    });
    return rowPayments.map((rowPayment) =>
      PrismaPaymentMapper.toDomain(rowPayment),
    );
  }

  async save(payment: Payment): Promise<void> {
    const rowPayment = PrismaPaymentMapper.toPrisma(payment);
    await this.prisma.payment.update({
      where: { id: payment.id },
      data: rowPayment,
    });
  }
}
