import {
  PaymentMethod,
  PaymentMethodSchema,
} from '@app/entities/PaymentMethod/PaymentMethod';

export class MakePaymentMethod {
  static create(override: Partial<PaymentMethodSchema>): PaymentMethod {
    return new PaymentMethod({
      name: 'Credit Card',
      ...override,
    });
  }
}
