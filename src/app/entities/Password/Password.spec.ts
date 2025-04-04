import { Password } from './Password';

describe('Password', () => {
  it('Should be able create a password', () => {
    const user = new Password('teste123');

    expect(user).toBeTruthy();
  });

  it('Should be able to encrypt the password', () => {
    const password = new Password('teste123');

    expect(password.value).not.toBe('teste123');
  });

  it('Shold be able to compare the password', () => {
    const password = 'teste123';
    const hashedPassword = new Password('teste123').value;

    const decryptedPassword = Password.compare(password, hashedPassword);

    expect(decryptedPassword).toBe(true);
  });
});
