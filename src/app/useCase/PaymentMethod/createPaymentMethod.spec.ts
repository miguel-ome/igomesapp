import { PaymentMethodInMemoryRepository } from '@test/inMemory/PaymentMethodInMemory.repository';
import { CreatePaymentMethodUseCase } from './createPaymentMethod';

describe('Create Payment Method', () => {
  let createPaymentMethodUseCase: CreatePaymentMethodUseCase;
  let paymentMethodInMemoryRepository: PaymentMethodInMemoryRepository;

  beforeEach(() => {
    paymentMethodInMemoryRepository = new PaymentMethodInMemoryRepository();
    createPaymentMethodUseCase = new CreatePaymentMethodUseCase(
      paymentMethodInMemoryRepository,
    );
  });

  it('Should be able to create a payment method in repository', async () => {
    const { message, status } = await createPaymentMethodUseCase.execute({
      name: 'Credit Card',
    });

    const listAllPaymentMethods =
      await paymentMethodInMemoryRepository.listAllPaymentMethods();

    expect(message).toBe('Método de pagamento criado com sucesso');
    expect(status).toBe(201);
    expect(listAllPaymentMethods).toHaveLength(1);
  });

  it('Should not be able to create a user in repository with name empty', async () => {
    // Test with empity name
    expect(
      async () =>
        await createPaymentMethodUseCase.execute({
          name: '',
        }),
    ).rejects.toThrow('The name is empty');
  });
});
