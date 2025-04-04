import { UserInMemoryRepository } from '@test/inMemory/userInMemory.repository';
import { DeleteUserUseCase } from './deleteUser.useCase';
import { User } from '@app/entities/User/User';
import { HttpException } from '@nestjs/common';

describe('Delete user', () => {
  let deleteUserUseCase: DeleteUserUseCase;
  let userInMemoryRepository: UserInMemoryRepository;

  beforeEach(() => {
    userInMemoryRepository = new UserInMemoryRepository();
    deleteUserUseCase = new DeleteUserUseCase(userInMemoryRepository);

    // Crinado o usuário 1
    userInMemoryRepository.create(
      new User({
        login: 'eliseu',
        name: 'Eliseu Miguel',
        password: 'teste123',
      }),
    );

    // Crinado o usuário 2
    userInMemoryRepository.create(
      new User({
        login: 'emyli',
        name: 'Emyli Gomes',
        password: '1t2e3s4t',
      }),
    );
  });

  it('Should be able to delete a user', async () => {
    const userToDelete = new User({
      login: 'elias',
      name: 'elias gabriel',
      password: '123teste',
    });

    // Crinado o usuário 1
    userInMemoryRepository.create(userToDelete);

    await deleteUserUseCase.execute({ id: userToDelete.id });

    expect(
      userInMemoryRepository.findById(userToDelete.id),
    ).resolves.toBeNull();
  });

  it('Not should be able to delete a user because id not exist', async () => {
    await expect(
      deleteUserUseCase.execute({ id: 'id-inexistente' }),
    ).rejects.toThrow(HttpException);
  });
});
