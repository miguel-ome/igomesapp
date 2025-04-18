import { Payment } from '@app/entities/Payment/Payment';
import { PaymentRepository } from '@app/repository/PaymentRepository';

export class PaymentInMemoryRepository implements PaymentRepository {
  payments: Payment[] = [];

  async create(payment: Payment): Promise<void> {
    await this.payments.push(payment);
  }

  async delete(id: string): Promise<void> {
    const paymentIndex = this.payments.findIndex(
      (paymentM) => paymentM.id === id,
    );

    if (paymentIndex < 0) throw new Error('Pagamento não encontrado');

    this.payments.splice(paymentIndex, 1);
  }

  async save(payment: Payment): Promise<void> {
    const paymentIndex = this.payments.findIndex(
      (paymentMInMemory) => paymentMInMemory.id === payment.id,
    );

    this.payments[paymentIndex] = payment;
  }

  async listAllPayments(): Promise<Payment[]> {
    return await this.payments;
  }

  async findById(id: string): Promise<Payment | null> {
    const paymentIndex = this.payments.findIndex(
      (paymentMInMemory) => paymentMInMemory.id === id,
    );

    return paymentIndex === -1 ? null : this.payments[paymentIndex];
  }
}
