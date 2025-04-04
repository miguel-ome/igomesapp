import { User } from './user';

describe('User', () => {
  it('Should be able create a user', () => {
    const user = new User({
      name: 'Eliseu Miguel Marinho de Oliveira',
      login: 'miguel',
      password: 'teste123',
    });

    expect(user).toBeTruthy();
  });
});
