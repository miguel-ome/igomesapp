import { PaymentInMemoryRepository } from '@test/inMemory/PaymentInMemory.repository copy';
import { DeletePaymentUseCase } from './deletePaymente.useCase';
import { Payment } from '@app/entities/Payment/Payment';
import { MakePayment } from '@test/factories/MakePayment';
import { PaymentMethod } from '@app/entities/PaymentMethod/PaymentMethod';
import { MakePaymentMethod } from '@test/factories/MakePaymentMethod';
import { PaymentMethodInMemoryRepository } from '@test/inMemory/PaymentMethodInMemory.repository';

describe('DeletePaymentUseCase', () => {
  let deletePaymenteUseCase: DeletePaymentUseCase;
  let paymentRepository: PaymentInMemoryRepository;
  let paymentMethodRepository: PaymentMethodInMemoryRepository;

  let paymentMethod: PaymentMethod;
  let paymentToTest: Payment;

  beforeEach(() => {
    paymentRepository = new PaymentInMemoryRepository();
    paymentMethodRepository = new PaymentMethodInMemoryRepository();
    deletePaymenteUseCase = new DeletePaymentUseCase(paymentRepository);

    // Contruindo o método de pagamento in memory e adicionando ao repositório
    paymentMethod = MakePaymentMethod.create();
    paymentMethodRepository.create(paymentMethod);

    // Criando um pagamento
    paymentToTest = MakePayment.create({
      idPaymentMethod: paymentMethod.id,
      namePaymentMethod: paymentMethod.name,
    });
    paymentRepository.create(paymentToTest);
  });

  // Teste para verificar se o pagamento foi deletado com sucesso
  it('Should be able to delete a payment with success', async () => {
    const { message, status } = await deletePaymenteUseCase.execute({
      id: paymentToTest.id,
    });

    expect(message).toBe('Pagamento deletado com sucesso');
    expect(status).toBe(200);
    expect(paymentRepository.payments).toHaveLength(0);
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
