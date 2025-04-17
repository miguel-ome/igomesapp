import { PaymentMethod } from '@app/entities/PaymentMethod/PaymentMethod';

export abstract class PaymentMethodRepository {
  abstract create(paymentMethod: PaymentMethod): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract save(paymentMethod: PaymentMethod): Promise<void>;
  abstract listAllPaymentMethods(): Promise<PaymentMethod[]>;
  abstract findById(id: string): Promise<PaymentMethod | null>;
}
