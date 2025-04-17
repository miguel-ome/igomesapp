import { PaymentMethod } from '@app/entities/PaymentMethod/PaymentMethod';
import { PaymentMethodRepository } from '@app/repository/PaymentMethodRepository';

export class PaymentMethodInMemoryRepository
  implements PaymentMethodRepository
{
  private paymentsMethods: PaymentMethod[] = [];

  async create(paymentM: PaymentMethod): Promise<void> {
    await this.paymentsMethods.push(paymentM);
  }

  async delete(id: string): Promise<void> {
    const paymentIndex = this.paymentsMethods.findIndex(
      (paymentM) => paymentM.id === id,
    );

    if (paymentIndex < 0) throw new Error('Usuário não encontrado');

    this.paymentsMethods.splice(paymentIndex, 1);
  }

  async save(paymentM: PaymentMethod): Promise<void> {
    const paymentIndex = this.paymentsMethods.findIndex(
      (paymentMInMemory) => paymentMInMemory.id === paymentM.id,
    );

    this.paymentsMethods[paymentIndex] = paymentM;
  }

  async listAllPaymentMethods(): Promise<PaymentMethod[]> {
    return await this.paymentsMethods;
  }

  async findById(id: string): Promise<PaymentMethod | null> {
    const paymentIndex = this.paymentsMethods.findIndex(
      (paymentMInMemory) => paymentMInMemory.id === id,
    );

    return paymentIndex === -1 ? null : this.paymentsMethods[paymentIndex];
  }
}
