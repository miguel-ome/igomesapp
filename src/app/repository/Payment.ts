import { Payment } from '@app/entities/Payment/Payment';

export abstract class PaymentRepository {
  abstract create(payment: Payment): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract save(payment: Payment): Promise<void>;
  abstract listAllPayments(): Promise<Payment[]>;
  abstract findById(id: string): Promise<Payment | null>;
}
