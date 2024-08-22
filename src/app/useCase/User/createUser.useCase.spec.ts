import { CreateUserUseCase } from './createUser.useCase';
import { UserInMemoryRepository } from '@test/inMemory/userInMemory.repository';

describe('Create User', () => {
  let createUserUseCase: CreateUserUseCase;
  let userInMemoryRepository: UserInMemoryRepository;

  beforeEach(() => {
    userInMemoryRepository = new UserInMemoryRepository();
    createUserUseCase = new CreateUserUseCase(userInMemoryRepository);
  });

  it('Should be able to create a user in repository', async () => {
    const { user } = await createUserUseCase.execute({
      name: 'Eliseu Miguel Marinho de Oliveira',
      email: 'libmigueldev@hotmail.com',
      password: 'teste123',
    });

    expect(user).toBeTruthy();
    expect(userInMemoryRepository.users.length).toEqual(1);
    expect(userInMemoryRepository.users[0]).toEqual(user);
  });

  it('Should not be able to create a user in repository with password, name or email empity', async () => {
    // Test with empity name
    expect(
      async () =>
        await createUserUseCase.execute({
          name: '',
          email: 'libmigueldev@hotmail.com',
          password: 'teste123',
        }),
    ).rejects.toThrow(Error);

    // Test with empity email
    expect(
      async () =>
        await createUserUseCase.execute({
          name: 'Eliseu Miguel Marinho de Oliveira',
          email: '',
          password: 'teste123',
        }),
    ).rejects.toThrow(Error);

    // Test with empity password
    expect(
      async () =>
        await createUserUseCase.execute({
          name: 'Eliseu Miguel Marinho de Oliveira',
          email: 'libmigueldev@hotmail.com',
          password: '',
        }),
    ).rejects.toThrow(Error);
  });
});
