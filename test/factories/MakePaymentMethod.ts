import {
  PaymentMethod,
  PaymentMethodSchema,
} from '@app/entities/Payment/Payment';

export class MakePaymentMethod {
  static create(override: Partial<PaymentMethodSchema>): PaymentMethod {
    return new PaymentMethod({
      name: 'Credit Card',
      ...override,
    });
  }
}
