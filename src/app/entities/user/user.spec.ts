import { Email } from '../email/email';
import { User } from './user';

describe('User', () => {
  it('Should be able create a user', () => {
    const user = new User({
      name: 'Eliseu Miguel Marinho de Oliveira',
      email: new Email('libmigueldev@hotmail.com'),
      password: 'teste123',
    });

    expect(user).toBeTruthy();
  });
});
