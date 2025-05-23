import { User } from '@app/entities/User/User';
import { UserInMemoryRepository } from '@test/inMemory/UserInMemory.repository';
import { UpdateUserUseCase } from './updateUser.useCase';
import { HttpException } from '@nestjs/common';

describe('Update user', () => {
  let updateUserUseCase: UpdateUserUseCase;
  let userInMemoryRepository: UserInMemoryRepository;
  let userToTest: User;

  beforeEach(() => {
    userInMemoryRepository = new UserInMemoryRepository();
    updateUserUseCase = new UpdateUserUseCase(userInMemoryRepository);
    userToTest = new User({
      login: 'eliseu',
      name: 'Eliseu Miguel Marinho de Oliveira',
      password: 'teste123',
    });

    userInMemoryRepository.create(userToTest);
  });

  it('Should be able update the user', async () => {
    const { id, login, name } = {
      id: userToTest.id,
      name: 'Eliseu Miguel',
      login: 'miguel',
    };

    await updateUserUseCase.execute({ id, name, login });

    await expect(userInMemoryRepository.findById(id)).resolves.toEqual(
      expect.objectContaining({
        name,
        login,
      }),
    );
  });

  it('Not should be able update the user because login is empty', async () => {
    const infoUpdate = {
      id: userToTest.id,
      name: 'Eliseu Miguel',
      login: '',
    };

    await expect(updateUserUseCase.execute(infoUpdate)).rejects.toThrow(
      HttpException,
    );
  });

  it('Not should be able update the user because name is empty', async () => {
    const infoUpdate = {
      id: userToTest.id,
      name: '',
      login: 'eliseu',
    };

    await expect(updateUserUseCase.execute(infoUpdate)).rejects.toThrow(
      HttpException,
    );
  });

  it('Not should be able update the user because user not exist', async () => {
    const infoUpdate = {
      id: 'id-test',
      name: 'Eliseu Miguel',
      login: 'eliseu',
    };

    await expect(updateUserUseCase.execute(infoUpdate)).rejects.toThrow(
      HttpException,
    );
  });
});
