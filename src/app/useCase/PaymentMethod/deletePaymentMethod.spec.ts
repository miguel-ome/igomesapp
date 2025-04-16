import { PaymentMethodInMemoryRepository } from '@test/inMemory/PaymentMethodInMemory.repository';
import { DeletePaymentMethodUseCase } from './deletePaymentMethod';
import { PaymentMethod } from '@app/entities/Payment/Payment';

describe('Delete Payment Method', () => {
  let deletePaymentMethodUseCase: DeletePaymentMethodUseCase;
  let paymentMethodInMemoryRepository: PaymentMethodInMemoryRepository;

  beforeEach(() => {
    paymentMethodInMemoryRepository = new PaymentMethodInMemoryRepository();
    deletePaymentMethodUseCase = new DeletePaymentMethodUseCase(
      paymentMethodInMemoryRepository,
    );
  });

  it('Should be able to delete a PaymentMethod', async () => {
    const paymentMethodToDelete = new PaymentMethod({
      name: 'Debit Card',
    });

    // Crinado o método de pagamento 1
    paymentMethodInMemoryRepository.create(paymentMethodToDelete);

    await deletePaymentMethodUseCase.execute({ id: paymentMethodToDelete.id });

    expect(
      (await paymentMethodInMemoryRepository.listAllPaymentMethods()).length,
    ).toEqual(0);
  });

  it('Not should be able to delete a PaymentMethod because id not exist', async () => {
    await expect(
      deletePaymentMethodUseCase.execute({ id: 'id-inexistente' }),
    ).rejects.toThrow('Método de pagamento não encontrado');
  });
});
