import { Payment, PaymentSchema } from '@app/entities/Payment/Payment';
import { faker } from '@faker-js/faker/.';

export class MakePayment {
  static create(
    requiredFields: {
      idPaymentMethod: string;
      namePaymentMethod: string;
      idNf?: string;
      numberNf?: number;
    },
    override?: Partial<PaymentSchema>,
  ): Payment {
    // Propriedades obrigatórias

    const { idNf, idPaymentMethod, namePaymentMethod, numberNf } =
      requiredFields;
    return new Payment({
      dueDate: faker.date.future(),
      emissionDate: faker.date.past(),
      nf: {
        idNf,
        numberNf,
      },
      paymentMethod: {
        idPaymentMethod,
        namePaymentMethod,
      },
      value: faker.number.float(),
      ...override,
    });
  }
}
