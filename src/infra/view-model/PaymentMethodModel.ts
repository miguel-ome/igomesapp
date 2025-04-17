import { PaymentMethod } from '@app/entities/Payment/Payment';

export class PaymentMethodViewModel {
  static toHttp(paymentMethod: PaymentMethod) {
    return {
      id: paymentMethod.id,
      name: paymentMethod.name,
    };
  }
}
