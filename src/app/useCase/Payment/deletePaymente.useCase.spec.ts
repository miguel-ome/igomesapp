import { PaymentInMemoryRepository } from '@test/inMemory/PaymentInMemory.repository copy';
import { DeletePaymentUseCase } from './deletePaymente.useCase';
import { Payment } from '@app/entities/Payment/Payment';
import { MakePayment } from '@test/factories/MakePayment';

describe('DeletePaymentUseCase', () => {
  let deletePaymenteUseCase: DeletePaymentUseCase;
  let paymentInMemoryRepository: PaymentInMemoryRepository;
  let paymentToTest: Payment;

  beforeEach(() => {
    paymentInMemoryRepository = new PaymentInMemoryRepository();
    deletePaymenteUseCase = new DeletePaymentUseCase(paymentInMemoryRepository);

    paymentToTest = MakePayment.create();
    paymentInMemoryRepository.create(paymentToTest);
  });

  // Teste para verificar se o pagamento foi deletado com sucesso
  it('Should be able to delete a payment with success', async () => {
    const { message, status } = await deletePaymenteUseCase.execute({
      id: paymentToTest.id,
    });

    expect(message).toBe('Pagamento deletado com sucesso');
    expect(status).toBe(200);
    expect(paymentInMemoryRepository.payments).toHaveLength(0);
  });

  // Teste para verificar se o pagamento não foi encontrado
  it('Should throw Error if payment not found', async () => {
    await expect(
      deletePaymenteUseCase.execute({
        id: 'invalid-id',
      }),
    ).rejects.toThrow('Pagamento não encontrado');
  });
});
