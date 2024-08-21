import { makeUserSimple } from '@test/factories/user/makeUserSimple';
import { UserInMemoryRepository } from '@test/inMemory/userInMemory.repository';
import { FindUserByIDUseCase } from './findUserByID.useCase';
import { User } from '@app/entities/user/user';

describe('Find User by ID', () => {
  let findUserByIDUseCase: FindUserByIDUseCase;
  let userInMemoryRepository: UserInMemoryRepository;

  beforeEach(() => {
    userInMemoryRepository = new UserInMemoryRepository();
    findUserByIDUseCase = new FindUserByIDUseCase(userInMemoryRepository);
  });

  // Factories
  const userInMemoryRepositoryWithTwoUserCreated = async (): Promise<User> => {
    const userCreated = makeUserSimple();

    await userInMemoryRepository.create(userCreated);
    await userInMemoryRepository.create(makeUserSimple());

    return userCreated;
  };

  // Tests
  it('Should be able to find the user with your ID', async () => {
    const userCreated = await userInMemoryRepositoryWithTwoUserCreated();

    const { user } = await findUserByIDUseCase.execute({
      idUser: userCreated.id,
    });

    expect(user).toBeTruthy();
    expect(user).toEqual(userCreated);
  });

  it('Should not be able to find the user because the idUser passed not found', async () => {
    await userInMemoryRepositoryWithTwoUserCreated();

    expect(
      async () =>
        await findUserByIDUseCase.execute({
          idUser: 'id_invalid',
        }),
    ).rejects.toThrow();
  });
});
