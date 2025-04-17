import { PaymentMethod } from '@app/entities/PaymentMethod/PaymentMethod';

export class PaymentMethodViewModel {
  static toHttp(paymentMethod: PaymentMethod) {
    return {
      id: paymentMethod.id,
      name: paymentMethod.name,
    };
  }
}
