import { Payment } from '@app/entities/Payment/Payment';

export class PaymentViewModel {
  static toHttp(payment: Payment) {
    return {
      id: payment.id,
      nfe: {
        idNf: payment.idNf,
        numberNf: payment.numberNf,
      },
      paymentMethod: {
        idPaymentMethod: payment.idPaymentMethod,
        namePaymentMethod: payment.namePaymentMethod,
      },
      dueDate: payment.dueDate,
      emissionDate: payment.emissionDate,
      receivedDate: payment.receivedDate,
      value: payment.value,
    };
  }
}
