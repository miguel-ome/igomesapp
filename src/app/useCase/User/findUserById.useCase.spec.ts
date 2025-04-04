import { UserRepository } from '@app/repository/user/User.repository';
import { FindUserByIdUseCase } from './findUserById.useCase';
import { UserInMemoryRepository } from '@test/inMemory/userInMemory.repository';
import { User } from '@app/entities/User/User';
import { HttpException } from '@nestjs/common';

describe('Find user by id', () => {
  let finduserByIdUseCase: FindUserByIdUseCase;
  let userInMemoryRepository: UserRepository;
  let userToTest: User;

  beforeEach(() => {
    userInMemoryRepository = new UserInMemoryRepository();
    finduserByIdUseCase = new FindUserByIdUseCase(userInMemoryRepository);
    userToTest = new User({
      login: 'eliseu',
      name: 'Eliseu Miguel Marinho de Oliveira',
      password: 'teste123',
    });
  });

  it('Should be able to find the user with the id', async () => {
    userInMemoryRepository.create(userToTest);

    const user = await finduserByIdUseCase.execute({ id: userToTest.id });

    expect(user.user).toEqual(
      expect.objectContaining({
        id: userToTest.id,
        login: userToTest.login,
        name: userToTest.name,
      }),
    );
  });

  it('Not should be able to find the user because the id is empty', async () => {
    userInMemoryRepository.create(userToTest);

    await expect(
      finduserByIdUseCase.execute({ id: 'id-test' }),
    ).rejects.toThrow(HttpException);
  });
});
