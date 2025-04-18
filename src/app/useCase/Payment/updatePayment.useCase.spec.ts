import { PaymentInMemoryRepository } from '@test/inMemory/PaymentInMemory.repository copy';
import { UpdatePaymentUseCase } from './updatePayment.useCase';
import { PaymentMethodInMemoryRepository } from '@test/inMemory/PaymentMethodInMemory.repository';
import { NfeRepositoryInMemory } from '@test/inMemory/NfeInMemory.repository';
import { PaymentMethod } from '@app/entities/PaymentMethod/PaymentMethod';
import { Nfe } from '@app/entities/Nfe/Nfe';
import { MakePaymentMethod } from '@test/factories/MakePaymentMethod';
import { MakeNfe } from '@test/factories/MakeNfe';
import { Payment } from '@app/entities/Payment/Payment';
import { MakePayment } from '@test/factories/MakePayment';

describe('UpdatePaymentUseCase', () => {
  let updatePaymentUseCase: UpdatePaymentUseCase;
  let paymentRepository: PaymentInMemoryRepository;
  let paymentMethodRepository: PaymentMethodInMemoryRepository;
  let nfeRepository: NfeRepositoryInMemory;

  let paymentMethod: PaymentMethod;
  let nfe: Nfe;
  let paymentToTest: Payment;

  beforeEach(() => {
    paymentRepository = new PaymentInMemoryRepository();
    paymentMethodRepository = new PaymentMethodInMemoryRepository();
    nfeRepository = new NfeRepositoryInMemory();

    updatePaymentUseCase = new UpdatePaymentUseCase(
      paymentRepository,
      paymentMethodRepository,
      nfeRepository,
    );

    // Contruindo o método de pagamento in memory e adicionando ao repositório
    paymentMethod = MakePaymentMethod.create();
    paymentMethodRepository.create(paymentMethod);

    // Criando a nota fiscal in memory e adicionando ao repositório
    nfe = MakeNfe.CreateOneNfe();
    nfeRepository.create(nfe);

    // Criando o pagamento in memory e adicionando ao repositório
    paymentToTest = MakePayment.create();
    paymentRepository.create(paymentToTest);
  });

  it('Should throw an error if required fields are missing', async () => {
    await expect(
      updatePaymentUseCase.execute({
        id: paymentToTest.id,
        idPaymentMethod: '',
        dueDate: new Date(),
        emissionDate: new Date(),
        value: 100,
      }),
    ).rejects.toThrow('Preencha todos os campos obrigatórios');
  });

  it('Should throw an error if payment is not found', async () => {
    await expect(
      updatePaymentUseCase.execute({
        id: 'id-invalid',
        idPaymentMethod: paymentMethod.id,
        dueDate: new Date(),
        emissionDate: new Date(),
        value: 100,
      }),
    ).rejects.toThrow('Pagamento não encontrado');
  });

  it('Should throw an error if payment method is invalid', async () => {
    await expect(
      updatePaymentUseCase.execute({
        id: paymentToTest.id,
        idPaymentMethod: 'invalidMethod',
        dueDate: new Date(),
        emissionDate: new Date(),
        value: 100,
      }),
    ).rejects.toThrow('Forma de pagamento inválida');
  });

  it('should throw an error if emissionDate is after dueDate', async () => {
    await expect(
      updatePaymentUseCase.execute({
        id: paymentToTest.id,
        idPaymentMethod: paymentMethod.id,
        dueDate: new Date('2023-01-01'),
        emissionDate: new Date('2023-01-02'),
        value: 100,
      }),
    ).rejects.toThrow(
      'Data de emissão não pode ser maior que a data de vencimento',
    );
  });

  it('should throw an error if value is less than or equal to zero', async () => {
    await expect(
      updatePaymentUseCase.execute({
        id: paymentToTest.id,
        idPaymentMethod: paymentMethod.id,
        dueDate: new Date(),
        emissionDate: new Date(),
        value: -100,
      }),
    ).rejects.toThrow('Valor menor ou igual a zero');
  });

  it('should throw an error if NFe is not found when idNf is provided', async () => {
    await expect(
      updatePaymentUseCase.execute({
        id: paymentToTest.id,
        idPaymentMethod: paymentMethod.id,
        dueDate: new Date(),
        emissionDate: new Date(),
        value: 100,
        idNf: 'id-invalid',
      }),
    ).rejects.toThrow('Nota fiscal não encontrada');
  });

  it('should update payment successfully', async () => {
    const oldValue = paymentToTest.value;
    const { message, status } = await updatePaymentUseCase.execute({
      id: paymentToTest.id,
      idPaymentMethod: paymentMethod.id,
      dueDate: new Date('2023-02-02'),
      emissionDate: new Date('2023-01-02'),
      value: 200,
    });
    expect(status).toEqual(200);
    expect(message).toEqual('Pagamento atualizado com sucesso');
    expect(oldValue).not.toEqual(paymentToTest.value);
  });
});
