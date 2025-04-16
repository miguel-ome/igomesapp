import { PaymentMethodInMemoryRepository } from '@test/inMemory/PaymentMethodInMemory.repository';
import { CreatePaymentMethodUseCase } from './createPaymentMethod';
import { FindPaymentMethodUseCase } from './findPaymentMethodById';

describe('Find Payment Method', () => {
  let paymentMethodRepository: PaymentMethodInMemoryRepository;
  let createPaymentMethodUseCase: CreatePaymentMethodUseCase;
  let findPaymentMethodUseCase: FindPaymentMethodUseCase;

  beforeEach(() => {
    paymentMethodRepository = new PaymentMethodInMemoryRepository();
    createPaymentMethodUseCase = new CreatePaymentMethodUseCase(
      paymentMethodRepository,
    );
    findPaymentMethodUseCase = new FindPaymentMethodUseCase(
      paymentMethodRepository,
    );
  });

  it('Should find a payment method by ID', async () => {
    const { name } = { name: 'Pix' };
    const { status } = await createPaymentMethodUseCase.execute({ name });

    const allMethods = await paymentMethodRepository.listAllPaymentMethods();
    const methodId = allMethods[0].id;

    const { paymentMethod } = await findPaymentMethodUseCase.execute({
      id: methodId,
    });

    expect(paymentMethod.name).toBe('Pix');
  });

  it('Should throw error when ID is empty', async () => {
    await expect(findPaymentMethodUseCase.execute({ id: '' })).rejects.toThrow(
      'ID não informado',
    );
  });

  it('Should throw error when payment method not found', async () => {
    await expect(
      findPaymentMethodUseCase.execute({ id: 'non-existent-id' }),
    ).rejects.toThrow('Método de pagamento não encontrado');
  });
});
