import { PaymentMethodInMemoryRepository } from '@test/inMemory/PaymentMethodInMemory.repository';
import { UpdatePaymentMethodUseCase } from './updatePaymentMethod';
import { CreatePaymentMethodUseCase } from './createPaymentMethod';

describe('Update Payment Method', () => {
  let updatePaymentMethodUseCase: UpdatePaymentMethodUseCase;
  let createPaymentMethodUseCase: CreatePaymentMethodUseCase;
  let paymentMethodInMemoryRepository: PaymentMethodInMemoryRepository;

  beforeEach(() => {
    paymentMethodInMemoryRepository = new PaymentMethodInMemoryRepository();
    createPaymentMethodUseCase = new CreatePaymentMethodUseCase(
      paymentMethodInMemoryRepository,
    );
    updatePaymentMethodUseCase = new UpdatePaymentMethodUseCase(
      paymentMethodInMemoryRepository,
    );
  });

  it('Should be able to update a payment method', async () => {
    const { message: createMessage } = await createPaymentMethodUseCase.execute(
      {
        name: 'Pix',
      },
    );

    const [paymentMethod] =
      await paymentMethodInMemoryRepository.listAllPaymentMethods();

    const { message, status } = await updatePaymentMethodUseCase.execute({
      id: paymentMethod.id,
      name: 'Cartão de Crédito',
    });

    const updatedMethod = await paymentMethodInMemoryRepository.findById(
      paymentMethod.id,
    );

    expect(createMessage).toBe('Método de pagamento criado com sucesso');
    expect(message).toBe('Método de pagamento atualizado com sucesso');
    expect(status).toBe(200);
    expect(updatedMethod?.name).toBe('Cartão de Crédito');
  });

  it('Should not be able to update a payment method with invalid id', async () => {
    await expect(
      updatePaymentMethodUseCase.execute({
        id: 'non-existing-id',
        name: 'Boleto',
      }),
    ).rejects.toThrow('Método de pagamento não encontrado');
  });

  it('Should not be able to update a payment method with missing name', async () => {
    const { message: createMessage } = await createPaymentMethodUseCase.execute(
      {
        name: 'Transferência',
      },
    );

    const [paymentMethod] =
      await paymentMethodInMemoryRepository.listAllPaymentMethods();

    await expect(
      updatePaymentMethodUseCase.execute({
        id: paymentMethod.id,
        name: '',
      }),
    ).rejects.toThrow('ID e nome são obrigatórios');
  });

  it('Should not be able to update a payment method with missing id', async () => {
    await expect(
      updatePaymentMethodUseCase.execute({
        id: '',
        name: 'Cartão',
      }),
    ).rejects.toThrow('ID e nome são obrigatórios');
  });
});
