import { User } from '@app/entities/User/User';
import { ValidateUserAuthUseCase } from './validateUserAuth.useCase';
import { UserInMemoryRepository } from '@test/inMemory/userInMemory.repository';
import { HttpException } from '@nestjs/common';

describe('Validate user', () => {
  let validateUserUseCase: ValidateUserAuthUseCase;
  let userInMemoryRepository: UserInMemoryRepository;
  let userToTest: { login: string; name: string; password: string };

  beforeEach(() => {
    userInMemoryRepository = new UserInMemoryRepository();
    validateUserUseCase = new ValidateUserAuthUseCase(userInMemoryRepository);

    userToTest = {
      login: 'eliseu',
      name: 'Eliseu Miguel',
      password: 'teste123',
    };

    userInMemoryRepository.create(new User(userToTest));
  });

  it('Should be able validate user', async () => {
    const { user } = await validateUserUseCase.execute({
      login: userToTest.login,
      password: userToTest.password,
    });

    expect(user).toBeTruthy();
  });

  it('Not should be able validate user because the password is incorrect', async () => {
    await expect(
      validateUserUseCase.execute({
        login: 'eliseu',
        password: 'password-test',
      }),
    ).rejects.toThrow(HttpException);
  });

  it('Not should be able validate user because the login is incorrect', async () => {
    await expect(
      validateUserUseCase.execute({
        login: 'loginTest',
        password: 'test123',
      }),
    ).rejects.toThrow(HttpException);
  });
});
