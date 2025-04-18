import { User } from '@app/entities/User/User';
import { FindUserByLoginUseCase } from './findUserByLogin.useCase';
import { UserInMemoryRepository } from '@test/inMemory/UserInMemory.repository';
import { HttpException } from '@nestjs/common';

describe('Find user by login', () => {
  let findUserByLoginUseCase: FindUserByLoginUseCase;
  let userInMemoryRepository: UserInMemoryRepository;
  let userToTest: User;

  beforeEach(() => {
    userInMemoryRepository = new UserInMemoryRepository();
    findUserByLoginUseCase = new FindUserByLoginUseCase(userInMemoryRepository);
    userToTest = new User({
      login: 'eliseu',
      name: 'Eliseu Miguel',
      password: 'teste123',
    });

    userInMemoryRepository.create(userToTest);
  });

  it('Should be able to return user through the provided ID', async () => {
    const user = await findUserByLoginUseCase.execute({
      login: userToTest.login,
    });

    expect(user).toBeTruthy();
  });

  it('Should be able to return null when user does not exist', async () => {
    await expect(
      findUserByLoginUseCase.execute({
        login: 'nonexistentlogin',
      }),
    ).rejects.toThrow(HttpException);
  });
});
