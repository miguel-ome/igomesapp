import { MakeNfe } from '@test/factories/MakeNfe';
import { PaymentMethod } from './Payment';
import { MakePaymentMethod } from '@test/factories/MakePaymentMethod';

describe('PaymentMethod', () => {
  it('Should be able to create Nfe', () => {
    const paymentMethod = new PaymentMethod({ name: 'Credit Card' });
    expect(paymentMethod).toBeTruthy();
  });

  it('Should be able to update Nfe', () => {
    const paymentMethod = MakePaymentMethod.create({ name: 'Credit Card' });
    paymentMethod.update({ name: 'Debit Card' });

    expect(paymentMethod).toBeTruthy();
  });
});
