import { Payment } from './Payment';

describe('Payment', () => {
  it('Should be able to create Payment without receivedDate', () => {
    const payment = new Payment({
      nf: {},
      paymentMethod: {
        idPaymentMethod: '09ee94d4-dd70-487d-8176-7970e2cab8f1',
        namePaymentMethod: 'Cartão de Crédito',
      },
      dueDate: new Date('2023-10-01'),
      emissionDate: new Date('2023-10-01'),
      value: 100.0,
    });
    expect(payment).toBeTruthy();
  });

  it('Should be able to create Payment with idNf', () => {
    const payment = new Payment({
      nf: {
        idNf: '47d84ef4-761a-4a65-8b12-01ac45756c10',
        numberNf: 17580,
      },
      paymentMethod: {
        idPaymentMethod: '09ee94d4-dd70-487d-8176-7970e2cab8f1',
        namePaymentMethod: 'Cartão de Crédito',
      },
      dueDate: new Date('2023-10-01'),
      emissionDate: new Date('2023-10-01'),
      value: 100.0,
    });
    expect(payment).toBeTruthy();
  });

  it('Should be able to create Payment with receivedDate', () => {
    const payment = new Payment({
      nf: {},
      paymentMethod: {
        idPaymentMethod: '09ee94d4-dd70-487d-8176-7970e2cab8f1',
        namePaymentMethod: 'Cartão de Crédito',
      },
      dueDate: new Date('2023-10-01'),
      emissionDate: new Date('2023-10-01'),
      value: 100.0,
      receivedDate: new Date('2023-11-01'),
    });
    expect(payment).toBeTruthy();
  });
});
