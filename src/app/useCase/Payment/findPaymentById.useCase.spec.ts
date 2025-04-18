import { PaymentInMemoryRepository } from '@test/inMemory/PaymentInMemory.repository copy';
import { FindPaymentByIdUseCase } from './findPaymentById.useCase';
import { Payment } from '@app/entities/Payment/Payment';
import { MakePayment } from '@test/factories/MakePayment';

describe('FindPaymentByIdUseCase', () => {
  let findPaymentByIdUseCase: FindPaymentByIdUseCase;
  let paymentRepository: PaymentInMemoryRepository;

  let paymentToTest: Payment;

  beforeEach(() => {
    paymentRepository = new PaymentInMemoryRepository();
    findPaymentByIdUseCase = new FindPaymentByIdUseCase(paymentRepository);

    paymentToTest = MakePayment.create();
    paymentRepository.create(paymentToTest);
  });

  it('should find a payment by its ID', async () => {
    const { message, payment, status } = await findPaymentByIdUseCase.execute({
      id: paymentToTest.id,
    });

    expect(status).toBe(200);
    expect(message).toBe('Pagamento encontrado com sucesso');
    expect(payment).toEqual(paymentToTest);
  });

  it('should throw an error if payment is not found', async () => {
    await expect(
      findPaymentByIdUseCase.execute({ id: 'id-invalid' }),
    ).rejects.toThrow('Pagamento não encontrado');
  });
});
