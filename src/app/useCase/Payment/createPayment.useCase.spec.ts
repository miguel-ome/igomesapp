import { CreatePaymentUseCase } from './createPayment.useCase';
import { NfeRepositoryInMemory } from '@test/inMemory/NfeInMemory.repository';
import { PaymentInMemoryRepository } from '@test/inMemory/PaymentInMemory.repository copy';
import { PaymentMethodInMemoryRepository } from '@test/inMemory/PaymentMethodInMemory.repository';
import { MakePaymentMethod } from '@test/factories/MakePaymentMethod';
import { PaymentMethod } from '@app/entities/PaymentMethod/PaymentMethod';
import { Nfe } from '@app/entities/Nfe/Nfe';
import { MakeNfe } from '@test/factories/MakeNfe';

describe('CreatePaymentUseCase', () => {
  let createPaymentUseCase: CreatePaymentUseCase;
  let paymentInMemoryRepository: PaymentInMemoryRepository;
  let paymentMethodInMemoryRepository: PaymentMethodInMemoryRepository;
  let nfeInMemoryRepository: NfeRepositoryInMemory;

  let paymentMethod: PaymentMethod;
  let nfe: Nfe;

  beforeEach(() => {
    paymentInMemoryRepository = new PaymentInMemoryRepository();
    paymentMethodInMemoryRepository = new PaymentMethodInMemoryRepository();
    nfeInMemoryRepository = new NfeRepositoryInMemory();
    createPaymentUseCase = new CreatePaymentUseCase(
      paymentInMemoryRepository,
      paymentMethodInMemoryRepository,
      nfeInMemoryRepository,
    );

    // Contruindo o método de pagamento in memory e adicionando ao repositório
    paymentMethod = MakePaymentMethod.create();
    paymentMethodInMemoryRepository.create(paymentMethod);

    // Criando a nota fiscal in memory e adicionando ao repositório
    nfe = MakeNfe.CreateOneNfe();
    nfeInMemoryRepository.create(nfe);
  });

  it('Should be able to create a payment with success', async () => {
    const { message, status } = await createPaymentUseCase.execute({
      idPaymentMethod: paymentMethod.id,
      namePaymentMethod: paymentMethod.name,
      dueDate: new Date('2025-04-20'),
      emissionDate: new Date('2025-04-10'),
      value: 100,
    });

    expect(message).toBe('Pagamento criado com sucesso');
    expect(status).toBe(201);
    expect(paymentInMemoryRepository.payments).toHaveLength(1);
  });

  it('Should be able to create a payment with receiveDate success', async () => {
    const { message, status } = await createPaymentUseCase.execute({
      idPaymentMethod: paymentMethod.id,
      namePaymentMethod: paymentMethod.name,
      dueDate: new Date('2025-04-20'),
      emissionDate: new Date('2025-04-10'),
      value: 100,
      receivedDate: new Date('2025-04-21'),
    });

    expect(message).toBe('Pagamento criado com sucesso');
    expect(status).toBe(201);
    expect(paymentInMemoryRepository.payments).toHaveLength(1);
  });

  it('Should throw Erro if payment method is invalid', async () => {
    await expect(
      createPaymentUseCase.execute({
        idPaymentMethod: 'invalid-id',
        namePaymentMethod: paymentMethod.name,
        dueDate: new Date('2025-04-20'),
        emissionDate: new Date('2025-04-10'),
        value: 100,
        receivedDate: new Date('2025-04-21'),
      }),
    ).rejects.toThrow('Método de pagamento inválido');
  });

  it('Should throw error if value is less than or equal 0', async () => {
    await expect(
      createPaymentUseCase.execute({
        idPaymentMethod: paymentMethod.id,
        namePaymentMethod: paymentMethod.name,
        dueDate: new Date('2025-04-20'),
        emissionDate: new Date('2025-04-10'),
        value: -100,
        receivedDate: new Date('2025-04-21'),
      }),
    ).rejects.toThrow('Valor menor ou igual a zero');
  });

  it('Should throw error if dueDate is less than emissionDate', async () => {
    await expect(
      createPaymentUseCase.execute({
        idPaymentMethod: paymentMethod.id,
        namePaymentMethod: paymentMethod.name,
        dueDate: new Date('2024-04-05'),
        emissionDate: new Date('2025-04-10'),
        value: 100,
        receivedDate: new Date('2025-04-21'),
      }),
    ).rejects.toThrow(
      'Data de vencimento não pode ser anterior à data de emissão',
    );
  });

  it('Should thorw error if any field is empty', async () => {
    await expect(
      createPaymentUseCase.execute({
        idPaymentMethod: '',
        namePaymentMethod: paymentMethod.name,
        dueDate: new Date('2025-04-05'),
        emissionDate: new Date('2025-04-10'),
        value: 100,
        receivedDate: new Date('2025-04-21'),
      }),
    ).rejects.toThrow('Preencha todos os campos obrigatórios');
  });

  it('Should throw error if nfe is invalid', async () => {
    await expect(
      createPaymentUseCase.execute({
        idPaymentMethod: paymentMethod.id,
        namePaymentMethod: paymentMethod.name,
        dueDate: new Date('2025-04-10'),
        emissionDate: new Date('2025-04-05'),
        value: 100,
        receivedDate: new Date('2025-04-21'),
        idNf: 'invalid-id',
      }),
    ).rejects.toThrow('Nota fiscal não encontrada');
  });
});
