import { Payment } from '@app/entities/Payment/Payment';
import { Prisma } from '@prisma/client';

type RowPayment = Prisma.PaymentGetPayload<{
  include: {
    Nfe: {
      select: {
        id: true;
        numberNf: true;
      };
    };
    PaymentMethod: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}>;

export class PrismaPaymentMapper {
  static toPrisma(payment: Payment) {
    return {
      id: payment.id,
      idPaymentMethod: payment.idPaymentMethod,
      idNf: payment.idNf,
      dueDate: payment.dueDate,
      emissionDate: payment.emissionDate,
      receivedDate: payment.receivedDate,
      value: payment.value,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    };
  }

  static toDomain(rowPayment: RowPayment): Payment {
    return new Payment(
      {
        paymentMethod: {
          idPaymentMethod: rowPayment.idPaymentMethod,
          namePaymentMethod: rowPayment.PaymentMethod.name,
        },
        nf: {
          idNf: rowPayment.idNf,
          numberNf: rowPayment.Nfe?.numberNf ?? null,
        },
        dueDate: rowPayment.dueDate,
        emissionDate: rowPayment.emissionDate,
        receivedDate: rowPayment.receivedDate,
        value: Number(rowPayment.value),
        createdAt: rowPayment.createdAt,
        updatedAt: rowPayment.updatedAt,
      },
      rowPayment.id,
    );
  }
}
