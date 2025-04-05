import { CreateUserUseCase } from '@app/useCase/User/createUser.useCase';
import { Module } from '@nestjs/common';
import { CreateUserController } from './CreateUser.controller';
import { DeleteUserController } from './DeleteUser.controller';
import { DeleteUserUseCase } from '@app/useCase/User/deleteUser.useCase';
import { UpdateUserController } from './UpdateUser.controller';
import { UpdateUserUseCase } from '@app/useCase/User/updateUser.useCase';
import { FindUserByIdController } from './FindUserById.controller';
import { FindUserByIdUseCase } from '@app/useCase/User/findUserById.useCase';
import { FindUserByLoginController } from './FindUserByLogin.controller';
import { FindUserByLoginUseCase } from '@app/useCase/User/findUserByLogin.useCase';
import { ListAllUsersController } from './ListAllUser.controller';
import { ListAllUsersUseCase } from '@app/useCase/User/listAllUsers.useCase';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateUserController,
    DeleteUserController,
    FindUserByIdController,
    FindUserByLoginController,
    ListAllUsersController,
    UpdateUserController,
  ],
  providers: [
    CreateUserUseCase,
    DeleteUserUseCase,
    FindUserByIdUseCase,
    FindUserByLoginUseCase,
    ListAllUsersUseCase,
    UpdateUserUseCase,
  ],
})
export class UserModule {}
