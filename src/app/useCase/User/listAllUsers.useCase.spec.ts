import { ListAllUsersUseCase } from './listAllUsers.useCase';
import { UserInMemoryRepository } from '@test/inMemory/userInMemory.repository';

describe('Create User', () => {
  let listAllUsersUseCase: ListAllUsersUseCase;
  let userInMemoryRepository: UserInMemoryRepository;

  beforeEach(() => {
    userInMemoryRepository = new UserInMemoryRepository();
    listAllUsersUseCase = new ListAllUsersUseCase(userInMemoryRepository);
  });

  it('Should be able to return all users in repository', async () => {
    const { users } = await listAllUsersUseCase.execute();

    expect(users).;
    expect(userInMemoryRepository.users.length).toEqual(1);
    expect(userInMemoryRepository.users[0]).toEqual(user);
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
