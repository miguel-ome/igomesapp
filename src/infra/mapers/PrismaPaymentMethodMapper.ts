import { PaymentMethod } from '@app/entities/PaymentMethod/PaymentMethod';
import { PaymentMethod as RowPaymentMethod } from '@prisma/client';

export class PrismaPaymentMethodMapper {
  static toPrisma(paymentMethod: PaymentMethod) {
    return {
      id: paymentMethod.id,
      name: paymentMethod.name,
      createdAt: paymentMethod.createdAt,
      updatedAt: paymentMethod.updatedAt,
    };
  }

  static toDomain(rowPaymentMethod: RowPaymentMethod) {
    return new PaymentMethod(
      {
        name: rowPaymentMethod.name,
        createdAt: rowPaymentMethod.createdAt,
        updatedAt: rowPaymentMethod.updatedAt,
      },
      rowPaymentMethod.id,
    );
  }
}
