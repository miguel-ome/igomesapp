import { PaymentInMemoryRepository } from '@test/inMemory/PaymentInMemory.repository copy';
import { FindPaymentByIdUseCase } from './findPaymentById.useCase';
import { Payment } from '@app/entities/Payment/Payment';
import { MakePayment } from '@test/factories/MakePayment';
import { PaymentMethodInMemoryRepository } from '@test/inMemory/PaymentMethodInMemory.repository';
import { PaymentMethod } from '@app/entities/PaymentMethod/PaymentMethod';
import { MakePaymentMethod } from '@test/factories/MakePaymentMethod';

describe('FindPaymentByIdUseCase', () => {
  let findPaymentByIdUseCase: FindPaymentByIdUseCase;
  let paymentRepository: PaymentInMemoryRepository;
  let paymentMethodRepository: PaymentMethodInMemoryRepository;

  let paymentMethod: PaymentMethod;
  let paymentToTest: Payment;

  beforeEach(() => {
    paymentRepository = new PaymentInMemoryRepository();
    paymentMethodRepository = new PaymentMethodInMemoryRepository();
    findPaymentByIdUseCase = new FindPaymentByIdUseCase(paymentRepository);

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
