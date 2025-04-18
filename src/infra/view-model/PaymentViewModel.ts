import { Payment } from '@app/entities/Payment/Payment';

export class PaymentViewModel {
  static toHttp(payment: Payment) {
    return {
      id: payment.id,
      idNf: payment.idNf,
      idPaymentMethod: payment.idPaymentMethod,
      dueDate: payment.dueDate,
      emissionDate: payment.emissionDate,
      receivedDate: payment.receivedDate,
      value: payment.value,
    };
  }
}
