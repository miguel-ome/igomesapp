import { Payment, PaymentSchema } from '@app/entities/Payment/Payment';
import { faker } from '@faker-js/faker/.';

export class MakePayment {
  static create(override?: Partial<PaymentSchema>): Payment {
    return new Payment({
      dueDate: faker.date.future(),
      emissionDate: faker.date.past(),
      idNf: faker.string.uuid(),
      idPaymentMethod: faker.string.uuid(),
      value: faker.number.float(),
      ...override,
    });
  }
}
