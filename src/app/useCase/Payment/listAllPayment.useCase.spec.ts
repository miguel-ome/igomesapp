import { PaymentInMemoryRepository } from '@test/inMemory/PaymentInMemory.repository copy';
import { ListAllPaymentUseCase } from './listAllPayment.useCase';
import { MakePayment } from '@test/factories/MakePayment';

describe('ListAllPaymentUseCase', () => {
  let listAllPaymentUseCase: ListAllPaymentUseCase;
  let paymentInMemoryRepository: PaymentInMemoryRepository;

  beforeEach(() => {
    paymentInMemoryRepository = new PaymentInMemoryRepository();
    listAllPaymentUseCase = new ListAllPaymentUseCase(
      paymentInMemoryRepository,
    );
  });

  // Deve listar todos os pagamentos com sucesso
  it('Should be able to list all payments', async () => {
    // Cria 3 pagamentos
    paymentInMemoryRepository.create(MakePayment.create());
    paymentInMemoryRepository.create(MakePayment.create());
    paymentInMemoryRepository.create(MakePayment.create());

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
