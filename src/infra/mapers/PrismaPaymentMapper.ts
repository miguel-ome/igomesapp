import { Payment } from '@app/entities/Payment/Payment';
import { Payment as RowPayment } from '@prisma/client';

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
        idPaymentMethod: rowPayment.idPaymentMethod,
        idNf: rowPayment.idNf,
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
