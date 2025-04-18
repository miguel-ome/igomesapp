import { CreateUserUseCase } from './createUser.useCase';
import { UserInMemoryRepository } from '@test/inMemory/UserInMemory.repository';

describe('Create User', () => {
  let createUserUseCase: CreateUserUseCase;
  let userInMemoryRepository: UserInMemoryRepository;

  beforeEach(() => {
    userInMemoryRepository = new UserInMemoryRepository();
    createUserUseCase = new CreateUserUseCase(userInMemoryRepository);
  });

  it('Should be able to create a user in repository', async () => {
    await createUserUseCase.execute({
      name: 'Eliseu Miguel Marinho de Oliveira',
      login: 'miguel',
      password: 'teste123',
    });

    expect(userInMemoryRepository.findUserbyLogin('miguel')).toBeTruthy();
  });

  it('Should not be able to create a user in repository with password, name or login empity', async () => {
    // Test with empity name
    expect(
      async () =>
        await createUserUseCase.execute({
          name: '',
          login: 'miguel',
          password: 'teste123',
        }),
    ).rejects.toThrow(Error);

    // Test with empity login
    expect(
      async () =>
        await createUserUseCase.execute({
          name: 'Eliseu Miguel Marinho de Oliveira',
          login: '',
          password: 'teste123',
        }),
    ).rejects.toThrow(Error);

    // Test with empity password
    expect(
      async () =>
        await createUserUseCase.execute({
          name: 'Eliseu Miguel Marinho de Oliveira',
          login: 'miguel',
          password: '',
        }),
    ).rejects.toThrow(Error);
  });
});
