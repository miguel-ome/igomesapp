import { ListAllPaymentMethodsUseCase } from './listAllPaymentMethods';
import { PaymentMethodInMemoryRepository } from '@test/inMemory/PaymentMethodInMemory.repository';
import { CreatePaymentMethodUseCase } from './createPaymentMethod';

describe('List All Payment Methods', () => {
  let listAllPaymentMethodsUseCase: ListAllPaymentMethodsUseCase;
  let createPaymentMethodUseCase: CreatePaymentMethodUseCase;
  let paymentMethodInMemoryRepository: PaymentMethodInMemoryRepository;

  beforeEach(() => {
    paymentMethodInMemoryRepository = new PaymentMethodInMemoryRepository();
    listAllPaymentMethodsUseCase = new ListAllPaymentMethodsUseCase(
      paymentMethodInMemoryRepository,
    );
    createPaymentMethodUseCase = new CreatePaymentMethodUseCase(
      paymentMethodInMemoryRepository,
    );
  });

  it('Should return an empty list if no payment methods exist', async () => {
    const { paymentMethods } = await listAllPaymentMethodsUseCase.execute();
    expect(paymentMethods).toHaveLength(0);
  });

  it('Should list all created payment methods', async () => {
    await createPaymentMethodUseCase.execute({ name: 'Pix' });
    await createPaymentMethodUseCase.execute({ name: 'Boleto' });

    const { paymentMethods } = await listAllPaymentMethodsUseCase.execute();

    expect(paymentMethods).toHaveLength(2);
    expect(paymentMethods[0].name).toBe('Pix');
    expect(paymentMethods[1].name).toBe('Boleto');
  });
});
