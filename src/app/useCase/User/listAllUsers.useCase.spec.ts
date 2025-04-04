import { User } from '@app/entities/user/user';
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

    expect(users.length).toBe(0);

    const userCreated = new User({
      name: 'Eliseu Miguel',
      login: 'miguel',
      password: 'teste123',
    });

    userInMemoryRepository.create(userCreated);

    expect(users).toEqual(
      expect.arrayContaining([expect.objectContaining(userCreated)]),
    );
  });
});
