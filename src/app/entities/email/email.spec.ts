import { Email } from './email';

describe('Email', () => {
  it('Should be able create a email', () => {
    const email = new Email('libmigueldev@hotmail.com');

    expect(email).toBeTruthy();
  });

  it('Should not be able create a email because the email formait is invalid', () => {
    expect(() => new Email('outra coisa menos um email')).toThrow();
  });
});
