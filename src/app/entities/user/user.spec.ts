import { User } from './User';

describe('User', () => {
  it('Should be able create a user', () => {
    const user = new User({
      name: 'Eliseu Miguel Marinho de Oliveira',
      login: 'miguel',
      password: 'teste123',
    });

    expect(user).toBeTruthy();
  });

  it('Should be able update the user', () => {
    const user = new User({
      name: 'Eliseu Miguel Marinho de Oliveira',
      login: 'miguel',
      password: 'teste123',
    });

    user.update({
      login: 'eliseu',
      name: 'Eliseu Miguel',
    });

    expect(user.name).toBe('Eliseu Miguel');
    expect(user.login).toBe('eliseu');
  });
});
