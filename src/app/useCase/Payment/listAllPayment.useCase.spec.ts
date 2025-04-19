import { PaymentInMemoryRepository } from '@test/inMemory/PaymentInMemory.repository copy';
import { ListAllPaymentUseCase } from './listAllPayment.useCase';
import { MakePayment } from '@test/factories/MakePayment';
import { PaymentMethod } from '@app/entities/PaymentMethod/PaymentMethod';
import { Payment } from '@app/entities/Payment/Payment';
import { PaymentMethodInMemoryRepository } from '@test/inMemory/PaymentMethodInMemory.repository';
import { MakePaymentMethod } from '@test/factories/MakePaymentMethod';

describe('ListAllPaymentUseCase', () => {
  let listAllPaymentUseCase: ListAllPaymentUseCase;
  let paymentRepository: PaymentInMemoryRepository;
  let paymentMethodRepository: PaymentMethodInMemoryRepository;

  let paymentMethod: PaymentMethod;
  let paymentToTest: Payment;

  beforeEach(() => {
    paymentRepository = new PaymentInMemoryRepository();
    paymentMethodRepository = new PaymentMethodInMemoryRepository();
    listAllPaymentUseCase = new ListAllPaymentUseCase(paymentRepository);

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

  // Deve listar todos os pagamentos com sucesso
  it('Should be able to list all payments', async () => {
    // Cria 3 pagamentos
    paymentRepository.create(
      MakePayment.create({
        idPaymentMethod: paymentMethod.id,
        namePaymentMethod: paymentMethod.name,
      }),
    );
    paymentRepository.create(
      MakePayment.create({
        idPaymentMethod: paymentMethod.id,
        namePaymentMethod: paymentMethod.name,
      }),
    );
    paymentRepository.create(
      MakePayment.create({
        idPaymentMethod: paymentMethod.id,
        namePaymentMethod: paymentMethod.name,
      }),
    );

    const { listPayment, message, status } =
      await listAllPaymentUseCase.execute();

    expect(status).toBe(200);
    expect(message).toBe('Lista de pagamentos enviado com sucesso');
    expect(listPayment.length).toBe(3);
  });

  it('Should be able to return 204 when no payment is found', async () => {
    const { listPayment, message, status } =
      await listAllPaymentUseCase.execute();

    expect(status).toBe(204);
    expect(message).toBe('Nenhum registro encontrado');
    expect(listPayment.length).toBe(0);
  });
});
